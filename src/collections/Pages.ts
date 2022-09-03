import { CollectionConfig } from 'payload/types';
import SwitchView from '../admin/components/views/SwitchView';

const Pages: CollectionConfig = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        components: {
            views: {
                List: SwitchView
            }
        },
        
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