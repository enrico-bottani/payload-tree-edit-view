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
    endpoints: [
        {
            path: '/:id/path',
            method: 'get',
            handler: async (req, res, next) => {
                let response = [];
                let page;
                do {
                    page = await req.payload.findByID({ id: req.params.id, collection: "pages" });
                    response.push(page);
                } while (page == null || page.parent == null)
                if (response) {
                    res.status(200).send({ response });
                } else {
                    res.status(404).send({ error: 'not found' });
                }
            }
        }
    ]
}
export default Pages;