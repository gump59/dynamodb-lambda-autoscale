/* @flow */
import AWS from 'aws-sdk-promise';
import { json, stats, warning, invariant } from './Global';
import type {
  DynamoDBOptions,
  DescribeTableRequest,
  DescribeTableResponse,
  UpdateTableRequest,
  UpdateTableResponse,
  ListTablesRequest,
  ListTablesResponse,
} from './FlowTypes';

export default class DynamoDB {
  _db: AWS.DynamoDB;

  constructor(dynamoOptions: DynamoDBOptions) {
    invariant(typeof dynamoOptions !== 'undefined', 'Parameter \'dynamoOptions\' is not set');
    this._db = new AWS.DynamoDB(dynamoOptions);
  }

  async listTablesAsync(params: ?ListTablesRequest): Promise<ListTablesResponse> {
    let sw = stats.timer('DynamoDB.listTablesAsync').start();
    try {
      let res = await this._db.listTables(params).promise();
      return res.data;
    } catch (ex) {
      warning(JSON.stringify({
        class: 'DynamoDB',
        function: 'listTablesAsync'
      }, null, json.padding));
      throw ex;
    } finally {
      sw.end();
    }
  }

  async describeTableAsync(params: DescribeTableRequest): Promise<DescribeTableResponse> {
    let sw = stats.timer('DynamoDB.describeTableAsync').start();
    try {
      invariant(typeof params !== 'undefined', 'Parameter \'params\' is not set');

      let res = await this._db.describeTable(params).promise();
      return res.data;
    } catch (ex) {
      warning(JSON.stringify({
        class: 'DynamoDB',
        function: 'describeTableAsync',
        params
      }, null, json.padding));
      throw ex;
    } finally {
      sw.end();
    }
  }

  async updateTableAsync(params: UpdateTableRequest): Promise<UpdateTableResponse> {
    let sw = stats.timer('DynamoDB.updateTableAsync').start();
    try {
      invariant(typeof params !== 'undefined', 'Parameter \'params\' is not set');

      let res = this._db.updateTable(params).promise();
      return res.data;
    } catch (ex) {
      warning(JSON.stringify({
        class: 'DynamoDB',
        function: 'updateTableAsync',
        params
      }, null, json.padding));
      throw ex;
    } finally {
      sw.end();
    }
  }
}
