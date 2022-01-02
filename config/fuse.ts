import Fuse from 'fuse.js'

import Artwork from '../types/Artwork'

const searchOptions: Fuse.IFuseOptions<Artwork> = {
    includeScore: true,
    distance: 30,
    keys: ['artist.displayName', {
        name: 'operator.name',
        weight: 3
    }]
}

export default searchOptions