import React, { useState, useEffect } from "react";
import moment from "moment";

export const DisplayLabel = ({ message }) => {
  return message ? (
    <h4 className="flex items-center justify-center m-2">{message}</h4>
  ) : null;
};

export const nullChecker = (val) => (!val ? " - " : val);

const style = {
  table: {
    th: "px-2 bg-slate-50 text-slate-500 align-middle border border-solid border-slate-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left",
    td: "px-2 align-middle border-t-0 border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left",
  },
};

const PromoView = ({ data, isLoading, onClick, onDelete }) => {
  const { promos } = data;
  return (
    <>
      {promos && promos.length > 0 ? (
        <div className="block w-full overflow-x-auto">
          <table className="iitems-center w-full bg-transparent border-collapse">
            <thead className="text-gray-700 bg-gray-50">
              <tr className="font-semibold py-3 text-sm uppercase text-left bg-gray-50 text-gray-700 align-middle border border-solid border-slate-100  border-l-0 border-r-0 whitespace-nowrap">
                <th className={style.table.th}>Title</th>
                <th className={style.table.th}>startDate</th>
                <th className={style.table.th}>endDate</th>
                <th className={style.table.th}>Brand/Product</th>
                <th className={style.table.th}>Created At</th>
                <th className={style.table.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((data, i) => {
                return (
                  <tr
                    key={"" + data?.id}
                    className="text-left text-md align-middle border-l-0 border-r-0 border border-solid border-slate-100 whitespace-nowrap"
                  >
                    <td className={style.table.td}>{nullChecker(data.title)}</td>
                    <td className={style.table.td}>
                      {moment(data.startDate).format("YYYY-DD-MM")}
                    </td>
                    <td className={style.table.td}>
                      {moment(data.endDate).format("YYYY-DD-MM")}
                    </td>
                    <td className={style.table.td + " text-center capitalize"}>
                      {nullChecker(data.appliedOn)}
                    </td>
                    <td className={style.table.td}>
                      {moment(data.created_at).format("YYYY-DD-MM")}
                    </td>
                    <td className={style.table.td}>
                      <button
                        className="bg-sky-500 text-white active:bg-sky-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                        size="sm"
                        onClick={() => onClick(data)}
                      >
                        <i className="fas fa-pencil"></i>
                      </button>
                      <button
                        className="bg-red-500 text-white active:bg-red-600 text-sm font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"
                        size="sm"
                        onClick={() => onDelete(data)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : isLoading ? (
        <DisplayLabel message="Loading..." />
      ) : (
        <DisplayLabel message="Records not found !!!" />
      )}
    </>
  );
};

export default PromoView;
