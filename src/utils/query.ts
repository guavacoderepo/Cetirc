import { pool } from "../../config/dbconfig";

export const findone = async (
  query: string,
  values: string[]
): Promise<any> => {
  return await pool.query(query, values);
};

export const find = async (query: string): Promise<any> => {
  return await pool.query(query);
};

export const insert = async (query: string, values: any[]): Promise<any> => {
  return await pool.query(query, values);
};

export const deleteOne = async (
  query: string,
  value: string[]
): Promise<any> => {
  return await pool.query(query, value);
};

export const updateOne = async (query: string, values: any[]): Promise<any> => {
  return await pool.query(query, values);
};
