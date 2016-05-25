#!/usr/bin/env python
# -*- coding: utf-8 -*-
import random
import string
import time
import os
import dateutil.parser
from datetime import datetime, timedelta

from powertrack.api import *
from cartodb import CartoDBAPIKey, CartoDBException, FileImport


config = ConfigParser.RawConfigParser()
config.read("champions.conf")

ACCOUNT_NAME = config.get('cartodb', 'account_name')
API_KEY = config.get('cartodb', 'api_key')
TABLE_NAME = config.get('cartodb', 'table_name')

p = PowerTrack(api="search")
cdb = CartoDBAPIKey(API_KEY, ACCOUNT_NAME)

categories = [
        ["#HalaMadrid", "#APorLaUndecima", "#RMUCL", "#RMFans", "#RMCity", "#RmHistory", "@realmadrid", "@realmadriden", "@readmadridfra", "@realmadridarab", "@realmadridjapan"],
        ["#LaUndecima"],
        ["Cristiano Ronaldo", "@Cristiano"],
        ["Gareth Bale", "@GarethBale11"],
        ["@jamesdrodriguez"],
        ["Sergio Ramos", "@SergioRamos"],
        ["Keylor Navas", "@NavasKeylor"],
        ["@MarceloM12"],
        ["Benzema", "@Benzema"],
        ["@officialpepe"],
        ["Luka Modric", "@lm19official"],
        ["Toni Kroos", "@ToniKroos"],
        ["Lucas Vázquez", "@Lucasvazquez91", "Casemiro", "@Casemiro", "@isco_alarcon", "Zidane", "Dani Carvajal", "@DaniCarvajal92", "@raphaelvarane", "@nachofi1990", "Kiko Casilla", "@KikoCasilla13", "Rubén Yáñez", "@RYanez93", "Mateo Kovacic", "@MateoKova16", "@JeseRodriguez10", "Arbeloa", "@aarbeloa17"],
]

# Get tweets from GNIP

def get_tweets(event, context):
    try:
        latest = cdb.sql("select * from {table_name} order by postedtime desc limit 1".format(table_name=TABLE_NAME))["rows"][0]
    except CartoDBException as e:
        print("some error ocurred", e)
    except (IndexError, AttributeError):
        start_timestamp = datetime.strptime(config.get('interval', 'start_timestamp'), "%Y%m%d%H%M")
    else:
        start_timestamp = dateutil.parser.parse(latest["postedtime"])

    end_timestamp = datetime.utcnow()

    tmp_table_name = TABLE_NAME + "_" + ''.join(random.choice(string.ascii_uppercase) for _ in range(25))
    tmp_table_filename = tmp_table_name

    for i, category in enumerate(categories):
        new_job = p.jobs.create(start_timestamp, end_timestamp, tmp_table_name, category, False)
        new_job.export_tweets(category=i + 1, append=False if i == 0 else True)

    # Now, because we can't use ogr2ogr, here comes the HACK!

    # 1) Import file into cartodb.com

    import_job = FileImport(tmp_table_name + ".csv", cdb)
    import_job.run()

    if import_job.success is True:
        import_job.update()
    else:
        return

    while import_job.state != "complete" and import_job.state != "failure":
        time.sleep(5)
        import_job.update()

    if import_job.state == "failure":
        return

    tmp_table_name = import_job.table_name  # Just in case it changed during import
    print "TMP_TABLE_NAME", tmp_table_name

    # 3) Append new data from temp table to master table (!!! seq name is hardcoded !!!)

    try:
        print cdb.sql("INSERT INTO {account_name}.{table_name} (actor_displayname,actor_followerscount,actor_friendscount,"
                     "actor_id,actor_image,actor_listedcount,actor_location,"
                     "actor_postedtime,actor_preferredusername,actor_statusescount,actor_summary,actor_utcoffset,"
                     "actor_verified,body,category_name,category_terms,favoritescount,geo,"
                     "inreplyto_link,link,location_geo,location_name,"
                     "object_type,"
                     "postedtime,retweetcount,the_geom,twitter_entities,"
                     "twitter_lang,cartodb_id) SELECT actor_displayname,actor_followerscount,actor_friendscount,"
                     "actor_id,actor_image,actor_listedcount,actor_location,"
                     "actor_postedtime,actor_preferredusername,actor_statusescount,actor_summary,actor_utcoffset,"
                     "actor_verified,body,category_name,category_terms,favoritescount,geo,"
                     "inreplyto_link,link,location_geo,location_name,"
                     "object_type,"
                     "postedtime,retweetcount,the_geom,twitter_entities,"
                     "twitter_lang,nextval('rm_cartodb_id_seq_0') as cartodb_id "
                     "FROM {account_name}.{tmp_table_name}".format(table_name=TABLE_NAME, tmp_table_name=tmp_table_name, account_name=ACCOUNT_NAME))
    except CartoDBException as e:
        print ("Data couldn't be appended to master table", e)

    # 4) Delete temporary table

    try:
        print cdb.sql("DROP TABLE %s CASCADE" % tmp_table_name)
    except CartoDBException as e:
        print ("some error ocurred", e)

    try:
        os.remove(tmp_table_filename + '.csv')
    except OSError:
        pass

if __name__ == "__main__":
    get_tweets(None, None)
