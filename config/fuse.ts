import Fuse from 'fuse.js'

const searchOptions = {
    includeScore: true,
    distance: 30,
    keys: ['artist.displayName', {
        name: 'operator.name',
        weight: 3
    }]
}

export default searchOptions