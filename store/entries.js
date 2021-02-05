export const state = () => ({
    // Accepts { date: SimpleDate, entries: entriesArr }
    trackerEntriesByDate: []
})

export const mutations = {
    resetStore(state){
        state.trackerEntriesByDate = [];
    },
    addEntryByDate(state, { date, entry }){
        console.log('store/Entries: addEntryByDate');

        const findByDate = (element) => {
            return (element.date == date);
        }

        const ind = state.trackerEntriesByDate.findIndex(findByDate);

        if(!entry) return;

        if(ind === -1){
            state.trackerEntriesByDate.push({ date, entries: [entry] });
        } else {

            if(!state.trackerEntriesByDate[ind].entries)
                state.trackerEntriesByDate[ind].entries = [];
            
            state.trackerEntriesByDate[ind].entries.push(entry);
        }
    },
    addEntriesByDate(state, { date, entries }){
        console.log('store/Entries: addEntriesByDate');

        const findByDate = (element) => {
            return (element.date == date);
        }

        const ind = state.trackerEntriesByDate.findIndex(findByDate);

        if(!entries) return;

        if(ind === -1){
            state.trackerEntriesByDate.push({ date, entries });
        } else {
            // Only when there is no current data (a.k.a only on first load)
            if(!state.trackerEntriesByDate[ind].entries){
                state.trackerEntriesByDate[ind].entries = entries;
            }
        }
    },
    rmEntry(state, { _id }){
        console.log('store/Entries: rmEntryById');

        for(const entry of state.trackerEntriesByDate){
            const entries = entry.entries;

            for(let i = 0; i < entries.length; i ++){
                const _entry = entries[i];

                if(_entry._id == _id){
                    // Splice entry...
                    entry.entries.splice(i, 1);
                }
            }
        }

    }
}
