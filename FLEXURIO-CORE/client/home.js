/**
 * Created by MacBookPro on 9/10/15.
 */

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { flashMessages } from 'meteor/mrt:flash-messages';
import './home.html';

Template.home.created= function(){
    this.autorun(function(){
        subscribtion('team',{aktifYN : 1},{},0);
        subscribtion('jadwal',{aktifYN : 1},{},0);
    });
};

Template.header.helpers({
    namaApp: function () {
        return sAPPName;
    }
});

Template.login.helpers({
    namaApp: function () {
        return sAPPName;
    },
    sHeaderBackground: function () {
        return sHeaderBackground;
    }
});
Template.home.helpers({
    Team: function(){
        return TEAM.find().fetch()
    },
    Jadwal:function(){
        return JADWAL.find().fetch()
    },
});
Template.home.events({
    'click div.card-group':function(e, tpl){
        e.preventDefault();
        Router.go('team')
    },
    'click div.card-schedule':function(e, tpl){
        e.preventDefault();
        Router.go('jadwal')
    }

})
