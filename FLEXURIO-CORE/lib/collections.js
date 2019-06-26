/**
 * Flexurio Created by YN.Pamungkas Jayuda on 12/3/15.
 */
import {Mongo} from 'meteor/mongo';

MENU = new Mongo.Collection('menu');
MENUGROUP = new Mongo.Collection('menuGroup');
MENUAUTH = new Mongo.Collection('menuAuth');
MEMBER = Meteor.users;
MESSAGE = new Mongo.Collection('message');
MESSAGEMEMBER = new Mongo.Collection('messageMember');
ACTIVITYLOGS = new Mongo.Collection('activitylogs');
PROFILEDATA = new Mongo.Collection('profileData');
WOTIPE = new Mongo.Collection('woTipe');
WOSUBTIPE = new Mongo.Collection('woSubTipe');
WOSUBTIPEDETAIL = new Mongo.Collection('woSubTipeDetail');
WO = new Mongo.Collection('wo');
APIMANAGER = new Mongo.Collection('apimanager');
ANGGOTA = new Mongo.Collection('anggota'); 
KELOMPOK = new Mongo.Collection('kelompok'); 
JADWAL = new Mongo.Collection('jadwal'); 
TEAM = new Mongo.Collection('team'); 
USER = new Mongo.Collection('user'); 
ABSEN = new Mongo.Collection('absen'); 
