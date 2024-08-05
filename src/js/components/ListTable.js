import React from 'react';

export default function ListTable() {
    return (
        <div className="swise-mt-8 swise-flow-root">
            <div className="swise--mx-4 swise--my-2 swise-overflow-x-auto sm:swise--mx-6 lg:swise--mx-8">
                <div
                    className="swise-inline-block swise-min-w-full swise-py-2 swise-align-middle sm:swise-px-6 lg:swise-px-8">
                    <div
                        className="swise-overflow-hidden swise-shadow swise-ring-1 swise-ring-black swise-ring-opacity-5 sm:swise-rounded-lg">
                        <table className="swise-min-w-full swise-divide-y swise-divide-gray-300">
                            <thead className="swise-bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="swise-py-3.5 swise-pl-4 swise-pr-3 swise-text-left swise-text-sm swise-font-semibold swise-text-gray-900 sm:swise-pl-6">Name
                                </th>
                                <th scope="col"
                                    className="swise-px-3 swise-py-3.5 swise-text-left swise-text-sm swise-font-semibold swise-text-gray-900">Title
                                </th>
                                <th scope="col"
                                    className="swise-px-3 swise-py-3.5 swise-text-left swise-text-sm swise-font-semibold swise-text-gray-900">Email
                                </th>
                                <th scope="col"
                                    className="swise-px-3 swise-py-3.5 swise-text-left swise-text-sm swise-font-semibold swise-text-gray-900">Role
                                </th>
                                <th scope="col"
                                    className="swise-relative swise-py-3.5 swise-pl-3 swise-pr-4 sm:swise-pr-6">
                                    <span className="swise-sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="swise-divide-y swise-divide-gray-200 swise-bg-white">
                            <tr>
                                <td className="swise-whitespace-nowrap swise-py-4 swise-pl-4 swise-pr-3 swise-text-sm swise-font-medium swise-text-gray-900 sm:swise-pl-6">Lindsay
                                    Walton
                                </td>
                                <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">Front-end
                                    Developer
                                </td>
                                <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">lindsay.walton@example.com</td>
                                <td className="swise-whitespace-nowrap swise-px-3 swise-py-4 swise-text-sm swise-text-gray-500">Member</td>
                                <td className="swise-relative swise-whitespace-nowrap swise-py-4 swise-pl-3 swise-pr-4 swise-text-right swise-text-sm swise-font-medium sm:swise-pr-6">
                                    <a href="#"
                                       className="swise-text-indigo-600 hover:swise-text-indigo-900">Edit<span
                                        className="swise-sr-only">, Lindsay Walton</span></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}