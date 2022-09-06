import { CollectionConfig } from 'payload/types';
import SwitchView from '../admin/components/views/SwitchView';

const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'name',
        components: {
            views: {
                List: SwitchView
            }
        },
        
    },
    fields: [
        {
            name: 'name',
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
        {
            name: 'parent', // required
            type: 'relationship', // required
            relationTo: ["pages"],
            hasMany: false,
        },
    ],
}
export default Pages;