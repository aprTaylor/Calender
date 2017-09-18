import {Event, Menus, Themes} from './objects'

/**
 * Saves calender information to local storage
 */
export function save() {
    //save events
    let evs = {};
    events.forEach((event, i) => {
        evs[i] = event;
    });

    localStorage.setItem('events', JSON.stringify(evs));

    //save stickers
    let sckers = {};
    stickers.forEach(function (sticker, i) {
        sckers[i] = sticker;
    });
    localStorage.setItem('stickers', JSON.stringify(sckers));

    //save frame
    localStorage.setItem('frame', JSON.stringify(frame));

    //save Themes
    console.log("theme", settings.themeName);
    localStorage.setItem('theme', settings.themeName)
}

/**
 * Loads and reinstates calender information from storage a
 */
export function load() {
    let evs = JSON.parse(localStorage.getItem('events'));
    let sckers = JSON.parse(localStorage.getItem('stickers'));
    //let fme = JSON.parse(localStorage.getItem('frame'));

    for (let e in evs) {
        //add events to stored events
        let newEvent = new Event(evs[e].time, evs[e].title, evs[e].notes, evs[e].tdID); //create a new event from the stored one
        events.push(newEvent);
        //parse event into an element and append to corresponding div
        let td = document.getElementById(`${newEvent.tdID}`);
        if (td) //check that query selection is not null
            td.getElementsByClassName("eventContainer")[0].appendChild(newEvent.toElement());
    }
    //TODO: load stickers
    for (let s in sckers) {
        stickers.push(sckers[s]);
    }
    //frame = fme;

    //load saved theme
    settings.theme = localStorage.getItem('Theme') ? Themes[localStorage.getItem('Theme')] : settings.theme;
}

/**
 * Fills in view menu
 * @param {string} title title of event
 * @param {string} time time of event
 * @param {string} notes notes about event
 */
export function fillInView() {
    //Match td to an event
    events.some(e => {
        if (e.id == selectedEvent.id) {
            //Gives view event object content
            Menus.contentGenerators.viewEvent(e);
            return true;
        }
    });
}
