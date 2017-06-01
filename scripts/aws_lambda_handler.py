# -*- coding: utf-8 -*-

import random
import string
import ConfigParser
import requests
import time
from datetime import datetime, timedelta
import os
import os.path
from powertrack.category_helper import Job
from carto.auth import APIKeyAuthClient
from carto.sql import SQLClient
import logging

logging.basicConfig(
        level='INFO',
        format=' %(asctime)s - %(levelname)s - %(message)s',
        datefmt='%I:%M:%S %p')

logging.getLogger("requests").setLevel(logging.WARNING)
logging.getLogger("urllib3").setLevel(logging.WARNING)

logger = logging.getLogger('lambda_handler')

def lambda_handler(event, context):
	logger.info("Reading config")
	config = ConfigParser.RawConfigParser()
	config.read("realmadrid.conf")

	IMPORT_API_ENDPOINT = config.get('cartodb', 'import_api_endpoint')
	ACCOUNT_NAME = config.get('cartodb', 'account_name')
	API_KEY = config.get('cartodb', 'api_key')
	API_URL = config.get('cartodb','base_api_endpoint')
	ORGANIZATION= config.get('cartodb','organization')
	TABLE_NAME = config.get('cartodb', 'table_name')
	LOG_TABLE_NAME = config.get('cartodb', 'log_table_name')
	RUN_AFTER_S = config.get('intervals', 'run_after_s')
	CLEAN_OLDER_THAN_D = config.get('intervals', 'clean_older_than_d')
	SEQUENCE = config.get('cartodb', 'sequence_name')


	cl = APIKeyAuthClient(base_url=API_URL, api_key=API_KEY, organization=ORGANIZATION)

	categories = {
		'Real Madrid'       : ["#HalaMadrid", "#RMUCL", "#RMFans", "#RMCity", "#RmHistory", "@realmadrid", "@realmadriden", "@readmadridfra", "@realmadridarab", "@realmadridjapan"],
		'A por la 12'       : ["#aporla12", "#aporladuodecima", u'#aporladuodécima'.encode('utf-8').strip() ],
		'Cristiano Ronaldo' : ["@Cristiano", "Cristiano"],
		'Gareth Bale'       : ["@GarethBale11", "Bale"],
		'James Rodríguez'   : ["@jamesdrodriguez", u"James Rodríguez".encode('utf-8').strip(), "James Rodriguez"],
		'Sergio Ramos'      : ["@SergioRamos", "Sergio Ramos"],
		'Keylor Navas'      : ["@NavasKeylor", "Keylor Navas"],
		'Marcelo'           : ["@MarceloM12", "Marcelo"],
		'Benzema'           : ["@Benzema", "Benzema"],
		'Pepe'              : ["@officialpepe", "Pepe"],
		'Modric'            : ["@lm19official", "Modric"],
		'Kroos'             : ["@ToniKroos", "Kroos"],
		'Kiko Casilla'      : ["@KikoCasilla13", "Kiko Casilla"],
		'Rubén Yáñez'       : ["@RYanez93", "Rubén Yáñez"],
		'Carvajal'          : ["@DaniCarvajal92", "Carvajal"],
		'Nacho Fernández'   : ["@nachofi1990", "Nacho Fernández"],
		'Varane'            : ["@raphaelvarane", "Varane"],
		'Coentrao'          : ["@Fabio_Coentrao", "Coentrao"],
		'Danilo Luiz'       : ["@2DaniLuiz", "Danilo Luiz"],
		'Casemiro'          : ["@Casemiro", "Casemiro"],
		'Kovacic'           : ["@MateoKova16", "Kovacic"],
		'Asensio'           : ["@MarcoAsensio10", "Asensio"],
		'Isco'              : ["@isco_alarcon", "Isco"],
		'Lucas Vázquez'     : ["@Lucasvazquez91", "Lucas Vázquez"],
		'Mariano Díaz'      : ["@marianodiaz9", "Mariano Díaz"],
		'Morata'            : ["@AlvaroMorata", "Morata"],
		'Zidane'            : ["@ZizouTheManager", "Zidane"]
	}

	sql_client = SQLClient(cl)

	logger.info("Checking for previous runs")
	has_it_run_results = sql_client.send("select * from {log_table_name} where runstatus IS NOT DISTINCT FROM 'complete' limit 1".format(log_table_name=LOG_TABLE_NAME))
	first_time = False

	if 'total_rows' in has_it_run_results:
		first_time = has_it_run_results['total_rows'] == 0

	if first_time:

		logger.info("This is the first time")

		start_timestamp = datetime.utcnow() - timedelta(days=5)#timedelta(days=int(CLEAN_OLDER_THAN_D))
		end_timestamp = datetime.utcnow() - timedelta(seconds=60)

		table_name = TABLE_NAME
		log_table_name = LOG_TABLE_NAME

		logger.info("Retrieving tweets from GNIP")
		new_job = Job(table_name)

		for title, terms in categories.iteritems():
			logger.debug("Retrieving category: {}".format(title))
			new_job.create_category(title,terms=terms)

		new_job.run(start_timestamp,end=end_timestamp)

		files = {'file': open('/tmp/' + table_name + '.csv', 'rb')}

		logger.info("Importing new table into CARTO")
		r = requests.post(IMPORT_API_ENDPOINT, files=files, params={"api_key": API_KEY})
		response_data = r.json()
		logger.debug("SUCCESS: {}".format(response_data["success"]))

		state = "uploading"
		item_queue_id = response_data["item_queue_id"]
		while state != "complete" and state != "failure":
			logger.debug("Waiting for table to be imported...")
			time.sleep(5)
			r = requests.get(IMPORT_API_ENDPOINT + item_queue_id, params={"api_key": API_KEY})
			response_data = r.json()
			state = response_data["state"]
			logger.debug(response_data)

		if state == "complete":
			table_name = response_data["table_name"]  # Just in case it changed during import
			logger.info("Table {} imported!".format(table_name))
			pg_timestamp = end_timestamp.strftime("%Y%m%d%H%M%S")
			logger.debug("Inserting metadata into log table")
			sql_client.send("INSERT INTO {log_table_name} (runstatus, runtable, runtimestamp, start_timestamp_for_next_run) VALUES ('{state}', '{table_name}', to_timestamp('{pg_timestamp}', 'YYYYMMDDHH24MISS'), '{pg_timestamp}')".format(
					log_table_name=LOG_TABLE_NAME,
					state=state,
					table_name=table_name,
					pg_timestamp=pg_timestamp))
			return {'message': 'Initial table imported and success logged to log table.'}
		elif state == "failure":
			return {'message': 'Failure state in initial table import. Log table not updated.'}
			# write to log table
			# make this a function and call it again
		return {'message': 'Unknown state achieved by import in if first_time=true block',
				'state': state }

	else: #second time
		logger.info("This is not the first time")

		# select * from logging table where status = success, order by runtimestamp desc, limit 1
		# then start_timestamp = rows['start_timestamp_for_next_run']
		logger.debug("Retrieving last run metadata")
		logs = sql_client.send("select * from {log_table_name} where runstatus IS NOT DISTINCT FROM 'complete' order by runtimestamp desc limit 1".format(log_table_name=LOG_TABLE_NAME))

		if 'rows' in logs and len(logs['rows']) == 1:
			start_timestamp_str = logs['rows'][0]['start_timestamp_for_next_run']
			start_timestamp = datetime.strptime(start_timestamp_str,'%Y%m%d%H%M%S')
			end_timestamp = datetime.utcnow() - timedelta(seconds=60)
			logger.debug('Timestamps from {} to {}'.format(start_timestamp, end_timestamp))
		else:
			return {'message' : 'The log table is wrong', 'error': 'Check the error table' }


		tmp_table_name = "{table_name}_".format(table_name=TABLE_NAME) + ''.join(random.choice(string.ascii_uppercase) for _ in range(25))
		tmp_table_filename = tmp_table_name + '.csv'

		logger.info("Retrieving tweets from GNIP")
		new_job = Job(tmp_table_name)

		for title, terms in categories.iteritems():
			logger.debug("Retrieving category: {}".format(title))
			new_job.create_category(title,terms=terms)

		new_job.run(start_timestamp,end=end_timestamp)

		# Now, because we can't use ogr2ogr, here comes the HACK!

		# 1) Import file into cartodb.com

		# only work if there are tweets
		filename = '/tmp/' + tmp_table_name + '.csv'

		if not os.path.exists(filename):
			logger.debug("No new tweets on this execution, all good")
			# save last timestamp
			pg_timestamp = end_timestamp.strftime("%Y%m%d%H%M%S")
			logger.debug("Writing into log")
			sql_client.send("INSERT INTO {log_table_name} (runstatus, runtable, runtimestamp, start_timestamp_for_next_run) VALUES ('{state}', '{table_name}', to_timestamp('{pg_timestamp}', 'YYYYMMDDHH24MISS'), '{pg_timestamp}')".format(
					log_table_name=LOG_TABLE_NAME,
					state='complete',
					table_name=TABLE_NAME,
					pg_timestamp=pg_timestamp))
			return {'message': 'No new tweets on this execution, all good'}


		files = {'file': open(filename, 'rb')}

		logger.info("Importing new tweets into a temporal table {}".format(tmp_table_name))
		r = requests.post(IMPORT_API_ENDPOINT, files=files, params={"api_key": API_KEY})
		response_data = r.json()
		logger.debug("SUCCESS: {}".format(response_data["success"]))

		state = "uploading"
		item_queue_id = response_data["item_queue_id"]
		while state != "complete" and state != "failure":
				logger.debug("Waiting for table to be imported...")
				time.sleep(5)
				try:
					r = requests.get(IMPORT_API_ENDPOINT + item_queue_id, params={"api_key": API_KEY})
				except ValueError:
					continue
				else:
					response_data = r.json()
					state = response_data["state"]
					logger.debug(response_data)

		if state == "failure":
				#continue
				logger.error("Error on importing the new tweets")
				return {'message': 'Failure state in subsequent tweet table import. Log table not updated.'}

		tmp_table_name = response_data["table_name"]  # Just in case it changed during import
		logger.debug("Updated temporal table name: {}".format(tmp_table_name))

		# 2) Append new data from temp table to master table

		try:
			# Check if table has rows to insert
			logger.info("Checking if the new table has rows")
			tmp_table_rows = sql_client.send("select count(*) from {}".format(tmp_table_name))

			if 'rows' in tmp_table_rows and len(tmp_table_rows['rows']) == 1 and tmp_table_rows['rows'][0]['count'] > 0:
				logger.info("Inserting {} new tweets in master table".format(tmp_table_rows['rows'][0]['count']))
				# Move the data into the master table
				query = '''
				INSERT INTO {table_name} (actor_displayname,actor_followerscount,actor_friendscount,
				actor_id,actor_image,actor_listedcount,actor_location, actor_postedtime,actor_preferredusername,
				actor_statusescount,actor_summary,actor_utcoffset, actor_verified,body,category_name,
				category_number,favoritescount,geo, inreplyto_link,link,location_geo,location_name,
				object_type, postedtime,retweetcount,the_geom,twitter_entities, twitter_lang,cartodb_id)
				SELECT actor_displayname,actor_followerscount,actor_friendscount, actor_id,
				actor_image,actor_listedcount,actor_location, actor_postedtime,actor_preferredusername,
				actor_statusescount,actor_summary,actor_utcoffset, actor_verified,body,category_name,
				category_number,favoritescount,geo, inreplyto_link,link,location_geo,location_name,
				object_type, postedtime,retweetcount,the_geom,twitter_entities, twitter_lang,
				nextval('{sequence}') as cartodb_id
				FROM {tmp_table_name}'''.format(table_name=TABLE_NAME, tmp_table_name=tmp_table_name, sequence=SEQUENCE)
				insert_into = sql_client.send(query)

			# save last timestamp
			pg_timestamp = end_timestamp.strftime("%Y%m%d%H%M%S")
			logger.info("Writing metadata into log table")
			sql_client.send("INSERT INTO {log_table_name} (runstatus, runtable, runtimestamp, start_timestamp_for_next_run) VALUES ('{state}', '{table_name}', to_timestamp('{pg_timestamp}', 'YYYYMMDDHH24MISS'), '{pg_timestamp}')".format(
					log_table_name=LOG_TABLE_NAME,
					state=state,
					table_name=TABLE_NAME,
					pg_timestamp=pg_timestamp))
		except Exception as e:
			logger.error("Data couldn't be appended to master table:\r\n{}".format(e))
			return {'message': 'Data couldn\'t be appended to master table in subsequent tweet table INSERT; log table not updated',
						'error': e }

		# 3) Delete temporary table
		try:
			logger.info("Dropping the temporal table {}".format(tmp_table_name))
			drop_table = sql_client.send("DROP TABLE {}".format(tmp_table_name))

		except Exception as e:
				logger.error("Some error ocurred: {}".format(e))
				return {'message' : 'Subsequent tweet table imported, log table updated, but error in droping temp cartodb table',
						'error': e }
		try:
			logger.info("Removing temporal file")
			os.remove(tmp_table_filename)
		except OSError:
			pass

		logger.info("Finished!")
		return {'message': 'Subsequent import/append into tweet table completed, log table updated with runstatus, temp table dropped, all good'}

if __name__ == '__main__':
	logger.info("Running as a script")
	result = lambda_handler(None,None)
	logger.info("Result execution:\r\n{}".format(result))

