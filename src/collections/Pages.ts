import { CollectionConfig } from 'payload/types';
import TreeView from '../admin/components/views/TreeView';

const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        components:{
            views:{
                List:TreeView
            }
        }
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
                isSortable: true,
            }
        },
    ],
}
export default Pages;