import { CollectionConfig } from 'payload/types';
import React, { FC } from 'react';
import type { Block } from 'payload/types';
import DefaultEditView from 'payload/dist/admin/components/views/collections/Edit/Default'
const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            type: 'text'
        },
        {
            name: 'children', // required
            type: 'relationship', // required
            relationTo: ["pages"],
            hasMany: true,
            admin: {
                isSortable: true
            }
        },
    ],
}
export default Pages;