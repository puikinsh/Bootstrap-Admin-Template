/**
* Bootstrap-Admin-Template v2.1.4
* Author : [object Object] 
* Copyright 2014
* Licensed under ,, (,,)
*/
window.App = Ember.Application.create();

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function () {
    this.resource('contacts', {path: '/contacts'}, function () {

        this.resource('contact', {path: '/:contact_id'});
        this.resource('new', {path: '/new'});
    });

    this.resource('flickr');
});

App.ContactsRoute = Ember.Route.extend({
    model: function () {
        return this.store.find('contact');
    }
});

App.Contact = DS.Model.extend({
    name: DS.attr('string'),
    last: DS.attr('string'),
    email: DS.attr('string')
});

App.Contact.FIXTURES = [
    {id: 1, name: 'John', last: 'Doe', email: 'john@doe.com'},
    {id: 2, name: 'Osman Nuri', last: 'Okumuş', email: 'onokumus@github.com'},
    {id: 3, name: 'Jane', last: 'Doe', email: 'jane@doe.com'},
    {id: 4, name: 'Alex', last: 'Baldwin', email: 'user@domain.com'},
    {id: 5, name: 'Ember', last: 'js', email: 'tomster@emberjs.com'}
];

App.ContactsController = Ember.ArrayController.extend({
    actions: {
        createContact: function () {
            var name = this.get('newFirst');
            var last = this.get('newLast');
            var email = this.get('newEmail');

            if (!name.trim()) {
                return;
            }
            var contact = this.store.createRecord('contact', {
                name: name,
                last: last,
                email: email
            });

            // Clear the "New Todo" text field
            this.set('newFirst', '');
            this.set('newLast', '');
            this.set('newEmail', '');

            // Save the new model
            contact.save();


            this.transitionToRoute('contacts');
        }
    },
    countContact: function () {
        return this.get('model').get('length');
    }.property('@each.model')
});

App.NewController = App.ContactsController.extend();


App.ContactController = Ember.ObjectController.extend({
    isEditing: false,
    actions: {
        edit: function () {
            this.set('isEditing', true);
        },
        doneEditing: function () {
            this.set('isEditing', false);
        },
        deleteContact: function () {
            var contact = this.get('model');
            contact.deleteRecord();
            contact.save();
            this.transitionToRoute('contacts');
        }
    },
    gravatarImage: function () {
        var size = 200;
        var email = this.get('email');
        return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
    }.property('email', 'size')
});


App.FlickrRoute = Ember.Route.extend({
    model: function () {
        return FlickrJson;
    }
});


var FlickrJson = [
    {
        "title": "Uploads from everyone",
        "link": "http://www.flickr.com/photos/",
        "description": "",
        "modified": "2013-09-15T15:21:53Z",
        "generator": "http://www.flickr.com/",
        "items": [
            {
                "title": "Osmancık 3",
                "link": "http://www.flickr.com/photos/esynr/9760329152/",
                "media": {"m": "http://farm4.staticflickr.com/3720/9760329152_c3f29a9aea_m.jpg"},
                "date_taken": "2013-09-15T16:45:56-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/esynr/\">£$¥_№N@m€s<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/esynr/9760329152/\" title=\"Osmancık 3\"><img src=\"http://farm4.staticflickr.com/3720/9760329152_c3f29a9aea_m.jpg\" width=\"240\" height=\"180\" alt=\"Osmancık 3\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:53Z",
                "author": "nobody@flickr.com (£$¥_№N@m€s)",
                "author_id": "98070746@N04",
                "tags": ""
            },
            {
                "title": "DSC_2029",
                "link": "http://www.flickr.com/photos/winterswijk/9760329322/",
                "media": {"m": "http://farm8.staticflickr.com/7399/9760329322_34d3c89331_m.jpg"},
                "date_taken": "2013-09-14T13:22:57-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/winterswijk/\">Winterswijk.org<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/winterswijk/9760329322/\" title=\"DSC_2029\"><img src=\"http://farm8.staticflickr.com/7399/9760329322_34d3c89331_m.jpg\" width=\"240\" height=\"160\" alt=\"DSC_2029\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:53Z",
                "author": "nobody@flickr.com (Winterswijk.org)",
                "author_id": "69584152@N05",
                "tags": ""
            },
            {
                "title": "IMG_0862",
                "link": "http://www.flickr.com/photos/101845841@N07/9760329982/",
                "media": {"m": "http://farm3.staticflickr.com/2815/9760329982_41e6bbb0c0_m.jpg"},
                "date_taken": "2013-08-26T10:02:39-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/101845841@N07/\">duytri58<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/101845841@N07/9760329982/\" title=\"IMG_0862\"><img src=\"http://farm3.staticflickr.com/2815/9760329982_41e6bbb0c0_m.jpg\" width=\"180\" height=\"240\" alt=\"IMG_0862\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:56Z",
                "author": "nobody@flickr.com (duytri58)",
                "author_id": "101845841@N07",
                "tags": ""
            },
            {
                "title": "KevTrip_306",
                "link": "http://www.flickr.com/photos/intenseimagery/9760330042/",
                "media": {"m": "http://farm4.staticflickr.com/3705/9760330042_154b018695_m.jpg"},
                "date_taken": "2013-08-22T09:12:04-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/intenseimagery/\">IntenseImagery<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/intenseimagery/9760330042/\" title=\"KevTrip_306\"><img src=\"http://farm4.staticflickr.com/3705/9760330042_154b018695_m.jpg\" width=\"240\" height=\"160\" alt=\"KevTrip_306\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:56Z",
                "author": "nobody@flickr.com (IntenseImagery)",
                "author_id": "85084942@N06",
                "tags": ""
            },
            {
                "title": "IMG_4701",
                "link": "http://www.flickr.com/photos/sanchezpaulk/9760330092/",
                "media": {"m": "http://farm8.staticflickr.com/7427/9760330092_2817ed5f1e_m.jpg"},
                "date_taken": "2013-09-13T10:22:42-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/sanchezpaulk/\">sanchezpaulk<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/sanchezpaulk/9760330092/\" title=\"IMG_4701\"><img src=\"http://farm8.staticflickr.com/7427/9760330092_2817ed5f1e_m.jpg\" width=\"240\" height=\"135\" alt=\"IMG_4701\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:56Z",
                "author": "nobody@flickr.com (sanchezpaulk)",
                "author_id": "33485704@N06",
                "tags": ""
            },
            {
                "title": "Shropshire Fields",
                "link": "http://www.flickr.com/photos/mark_twells/9760534796/",
                "media": {"m": "http://farm8.staticflickr.com/7307/9760534796_f32e464dc6_m.jpg"},
                "date_taken": "2013-09-12T16:16:47-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/mark_twells/\">Mark Twells<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/mark_twells/9760534796/\" title=\"Shropshire Fields\"><img src=\"http://farm8.staticflickr.com/7307/9760534796_f32e464dc6_m.jpg\" width=\"240\" height=\"96\" alt=\"Shropshire Fields\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:49Z",
                "author": "nobody@flickr.com (Mark Twells)",
                "author_id": "58651525@N00",
                "tags": "wales unitedkingdom priestweston"
            },
            {
                "title": " ",
                "link": "http://www.flickr.com/photos/94905052@N03/9760535486/",
                "media": {"m": "http://farm4.staticflickr.com/3735/9760535486_c66918f3a3_m.jpg"},
                "date_taken": "2013-09-03T07:53:06-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/94905052@N03/\">elliotandethan<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/94905052@N03/9760535486/\" title=\" \"><img src=\"http://farm4.staticflickr.com/3735/9760535486_c66918f3a3_m.jpg\" width=\"240\" height=\"180\" alt=\" \" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:52Z",
                "author": "nobody@flickr.com (elliotandethan)",
                "author_id": "94905052@N03",
                "tags": "uploaded:by=flickrmobile flickriosapp:filter=nofilter"
            },
            {
                "title": "IMG_9220",
                "link": "http://www.flickr.com/photos/mjwphotos/9760535676/",
                "media": {"m": "http://farm6.staticflickr.com/5467/9760535676_91c7ac32e2_m.jpg"},
                "date_taken": "2013-09-02T08:12:28-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/mjwphotos/\">mwphoto81<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/mjwphotos/9760535676/\" title=\"IMG_9220\"><img src=\"http://farm6.staticflickr.com/5467/9760535676_91c7ac32e2_m.jpg\" width=\"172\" height=\"240\" alt=\"IMG_9220\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:52Z",
                "author": "nobody@flickr.com (mwphoto81)",
                "author_id": "56787774@N04",
                "tags": ""
            },
            {
                "title": " ",
                "link": "http://www.flickr.com/photos/100379966@N04/9760535926/",
                "media": {"m": "http://farm6.staticflickr.com/5511/9760535926_4d262e8435_m.jpg"},
                "date_taken": "2013-09-13T17:17:25-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/100379966@N04/\">irunsjh<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/100379966@N04/9760535926/\" title=\" \"><img src=\"http://farm6.staticflickr.com/5511/9760535926_4d262e8435_m.jpg\" width=\"240\" height=\"240\" alt=\" \" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:53Z",
                "author": "nobody@flickr.com (irunsjh)",
                "author_id": "100379966@N04",
                "tags": "uploaded:by=flickrmobile flickriosapp:filter=nofilter"
            },
            {
                "title": "20130623/b/thumb_878425.jpeg",
                "link": "http://www.flickr.com/photos/97224851@N06/9760535934/",
                "media": {"m": "http://farm8.staticflickr.com/7371/9760535934_ed8bdbeb1b_m.jpg"},
                "date_taken": "2013-09-15T17:21:57-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/97224851@N06/\">freenewspos<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/97224851@N06/9760535934/\" title=\"20130623/b/thumb_878425.jpeg\"><img src=\"http://farm8.staticflickr.com/7371/9760535934_ed8bdbeb1b_m.jpg\" width=\"240\" height=\"240\" alt=\"20130623/b/thumb_878425.jpeg\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:57Z",
                "author": "nobody@flickr.com (freenewspos)",
                "author_id": "97224851@N06",
                "tags": ""
            },
            {
                "title": "_DSF2349",
                "link": "http://www.flickr.com/photos/aybee/9760536086/",
                "media": {"m": "http://farm4.staticflickr.com/3733/9760536086_70f1312b38_m.jpg"},
                "date_taken": "2013-09-10T13:18:51-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/aybee/\">Aybee<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/aybee/9760536086/\" title=\"_DSF2349\"><img src=\"http://farm4.staticflickr.com/3733/9760536086_70f1312b38_m.jpg\" width=\"240\" height=\"167\" alt=\"_DSF2349\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:54Z",
                "author": "nobody@flickr.com (Aybee)",
                "author_id": "7728108@N05",
                "tags": ""
            },
            {
                "title": "Flamethrower Shooting Gallery 2013 - 073",
                "link": "http://www.flickr.com/photos/28804910@N06/9760536146/",
                "media": {"m": "http://farm3.staticflickr.com/2817/9760536146_e08cb4c367_m.jpg"},
                "date_taken": "2013-08-30T23:09:38-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/28804910@N06/\">matisse_enzer<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/28804910@N06/9760536146/\" title=\"Flamethrower Shooting Gallery 2013 - 073\"><img src=\"http://farm3.staticflickr.com/2817/9760536146_e08cb4c367_m.jpg\" width=\"240\" height=\"160\" alt=\"Flamethrower Shooting Gallery 2013 - 073\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:55Z",
                "author": "nobody@flickr.com (matisse_enzer)",
                "author_id": "28804910@N06",
                "tags": ""
            },
            {
                "title": "IMG_0479",
                "link": "http://www.flickr.com/photos/33924876@N05/9760536336/",
                "media": {"m": "http://farm3.staticflickr.com/2820/9760536336_e5e9811052_m.jpg"},
                "date_taken": "2013-09-13T19:11:13-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/33924876@N05/\">mschwartz_00<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/33924876@N05/9760536336/\" title=\"IMG_0479\"><img src=\"http://farm3.staticflickr.com/2820/9760536336_e5e9811052_m.jpg\" width=\"240\" height=\"160\" alt=\"IMG_0479\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:56Z",
                "author": "nobody@flickr.com (mschwartz_00)",
                "author_id": "33924876@N05",
                "tags": ""
            },
            {
                "title": "CI6F8928",
                "link": "http://www.flickr.com/photos/yarashus/9760540735/",
                "media": {"m": "http://farm8.staticflickr.com/7300/9760540735_e55ff9ee80_m.jpg"},
                "date_taken": "2013-09-14T15:32:22-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/yarashus/\">C-Serpents<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/yarashus/9760540735/\" title=\"CI6F8928\"><img src=\"http://farm8.staticflickr.com/7300/9760540735_e55ff9ee80_m.jpg\" width=\"240\" height=\"160\" alt=\"CI6F8928\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:51Z",
                "author": "nobody@flickr.com (C-Serpents)",
                "author_id": "9875381@N08",
                "tags": "ncvc 2013 ncvcjuniors juniors’dayoutmarylandspecialolympicsmidatlanticchampionships"
            },
            {
                "title": "",
                "link": "http://www.flickr.com/photos/7867534@N05/9760540755/",
                "media": {"m": "http://farm3.staticflickr.com/2872/9760540755_328b84a3de_m.jpg"},
                "date_taken": "2013-07-08T22:17:13-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/7867534@N05/\">sudhirc212<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/7867534@N05/9760540755/\" title=\"\"><img src=\"http://farm3.staticflickr.com/2872/9760540755_328b84a3de_m.jpg\" width=\"240\" height=\"136\" alt=\"\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:51Z",
                "author": "nobody@flickr.com (sudhirc212)",
                "author_id": "7867534@N05",
                "tags": "flickrandroidapp:filter=none"
            },
            {
                "title": "Ethan",
                "link": "http://www.flickr.com/photos/101702638@N07/9760541515/",
                "media": {"m": "http://farm3.staticflickr.com/2865/9760541515_60161ac64d_m.jpg"},
                "date_taken": "2013-09-14T19:47:58-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/101702638@N07/\">williams_jason_photos<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/101702638@N07/9760541515/\" title=\"Ethan\"><img src=\"http://farm3.staticflickr.com/2865/9760541515_60161ac64d_m.jpg\" width=\"180\" height=\"240\" alt=\"Ethan\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:54Z",
                "author": "nobody@flickr.com (williams_jason_photos)",
                "author_id": "101702638@N07",
                "tags": "uploaded:by=flickrmobile flickriosapp:filter=nofilter"
            },
            {
                "title": "Shigurui_13_11",
                "link": "http://www.flickr.com/photos/100011642@N08/9760541645/",
                "media": {"m": "http://farm8.staticflickr.com/7375/9760541645_3a3bee8487_m.jpg"},
                "date_taken": "2013-09-15T08:21:55-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/100011642@N08/\">leomanga28<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/100011642@N08/9760541645/\" title=\"Shigurui_13_11\"><img src=\"http://farm8.staticflickr.com/7375/9760541645_3a3bee8487_m.jpg\" width=\"168\" height=\"240\" alt=\"Shigurui_13_11\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:55Z",
                "author": "nobody@flickr.com (leomanga28)",
                "author_id": "100011642@N08",
                "tags": ""
            },
            {
                "title": "IMG_0362",
                "link": "http://www.flickr.com/photos/78374447@N07/9760609743/",
                "media": {"m": "http://farm8.staticflickr.com/7322/9760609743_00757b79c4_m.jpg"},
                "date_taken": "2013-09-11T19:31:44-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/78374447@N07/\">Kramer-Lingen<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/78374447@N07/9760609743/\" title=\"IMG_0362\"><img src=\"http://farm8.staticflickr.com/7322/9760609743_00757b79c4_m.jpg\" width=\"240\" height=\"180\" alt=\"IMG_0362\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:56Z",
                "author": "nobody@flickr.com (Kramer-Lingen)",
                "author_id": "78374447@N07",
                "tags": ""
            },
            {
                "title": "Residential high-rise on the Barrikadnaya street in Moscow / Жилая высотка на Баррикадной улице в Москве",
                "link": "http://www.flickr.com/photos/89303433@N06/9760609803/",
                "media": {"m": "http://farm6.staticflickr.com/5325/9760609803_84af01887a_m.jpg"},
                "date_taken": "2013-09-15T19:21:56-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/89303433@N06/\">iSerega<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/89303433@N06/9760609803/\" title=\"Residential high-rise on the Barrikadnaya street in Moscow / Жилая высотка на Баррикадной улице в Москве\"><img src=\"http://farm6.staticflickr.com/5325/9760609803_84af01887a_m.jpg\" width=\"240\" height=\"240\" alt=\"Residential high-rise on the Barrikadnaya street in Moscow / Жилая высотка на Баррикадной улице в Москве\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:56Z",
                "author": "nobody@flickr.com (iSerega)",
                "author_id": "89303433@N06",
                "tags": "square squareformat iphoneography instagramapp uploaded:by=instagram foursquare:venue=4dc106fdc65b268b41d21349"
            },
            {
                "title": "Pumpkin carving 2012",
                "link": "http://www.flickr.com/photos/100725052@N03/9760609863/",
                "media": {"m": "http://farm4.staticflickr.com/3778/9760609863_2b9f675283_m.jpg"},
                "date_taken": "2012-10-21T16:21:46-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/100725052@N03/\">ua.dads<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/100725052@N03/9760609863/\" title=\"Pumpkin carving 2012\"><img src=\"http://farm4.staticflickr.com/3778/9760609863_2b9f675283_m.jpg\" width=\"180\" height=\"240\" alt=\"Pumpkin carving 2012\" /><\/a><\/p> ",
                "published": "2013-09-15T15:21:56Z",
                "author": "nobody@flickr.com (ua.dads)",
                "author_id": "100725052@N03",
                "tags": ""
            }
        ]
    }
];