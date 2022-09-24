import { CollectionConfig } from 'payload/types';
import SwitchView from '../admin/components/views/SwitchView/SwitchView';

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

                let nextId = req.params.id;

                let idMap = new Set<string>();
                idMap.add(nextId);

                do {
                    page = await req.payload.findByID({ id: nextId, collection: "pages", depth: 0 });
                    if (page == undefined) break;
                    response.push(page);
                    nextId = page.parent?.value;
                    if (idMap.has(nextId)) break;
                    idMap.add(nextId);
                } while (nextId)

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