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

export const deleteOne = async (query: string, id: string): Promise<any> => {
  return await pool.query(query, [id]);
};

export const updateOne = async (query: string, values: any[]): Promise<any> => {
  return await pool.query(query, values);
};
