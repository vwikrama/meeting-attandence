
          /**
          * Generated from flexurio at Sel Mei 14 13:34:56 WIB 2019
          * By muhamad at Linux muhamad-X455YA 4.15.0-47-generic #50-Ubuntu SMP Wed Mar 13 10:44:52 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

      import { Template } from 'meteor/templating';
      import { Session } from 'meteor/session';
      import './jadwal.html';

      Template.jadwal.created = function () {
         Session.set('limit', 50);
         Session.set('oFILTERS', {});
         Session.set('oOPTIONS', {});
         Session.set('textSearch', '');
         Session.set('namaHeader', 'DATA JADWAL');
         Session.set('dataDelete', '');
         Session.set('isCreating', false);
         Session.set('isDeleting', false);

         this.autorun(function () {
                subscribtion('jadwal', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
                subscribtion('team',{aktifYN: 1},{},0);
               });
       };

        Template.jadwal.onRendered(function () {
            ScrollHandler();
        });

        Template.jadwal.helpers({

            teamsa: function(){
               return TEAM.find().fetch();
            },

            isLockMenu: function () {
                return isLockMenu();
            },

            isActionADD: function () {
                return isAdminActions(Session.get('sURLMenu'), 'ADD');
            },

            isActionEDIT: function () {
                return isAdminActions(Session.get('sURLMenu'), 'EDIT');
            },

            isActionDELETE: function () {
                return isAdminActions(Session.get('sURLMenu'), 'DELETE');
            },

            isActionPRINT: function () {
                return isAdminActions(Session.get('sURLMenu'), 'PRINT');
            },

         sTinggiPopUp: function () {
            return 0.6*($(window).height());
         },
         isEditing: function() {
            return Session.get('idEditing') == this._id;
         },
         isDeleting: function() {
            return Session.get('isDeleting');
         },
         isCreating: function() {
            return Session.get('isCreating');
         },
         jadwals: function() {
            let textSearch = '';
            if(adaDATA(Session.get('textSearch'))) {
               textSearch = Session.get('textSearch').replace('#', '').trim();
            }

            let oOPTIONS = {
               sort: {createAt: -1},
               limit: Session.get('limit')
            }

            let oFILTERS = {
               aktifYN: 1,
               $or: [
               
         {topikmeeting: { $regex : new RegExp(textSearch, 'i') }},
         
         {image: { $regex : new RegExp(textSearch, 'i') }},

         {team: { $regex : new RegExp(textSearch, 'i') }},
         
         {tempat: { $regex : new RegExp(textSearch, 'i') }},
         
         {longtitude: { $regex : new RegExp(textSearch, 'i') }},
         
         {latitude: { $regex : new RegExp(textSearch, 'i') }},
         
         {waktu: { $regex : new RegExp(textSearch, 'i') }},
         
         {status: { $regex : new RegExp(textSearch, 'i') }},
         
               {_id: { $regex : new RegExp(textSearch, 'i') }},
               ]
            }

            return JADWAL.find(
                oFILTERS,
                oOPTIONS
            );
         }
      });

      Template.jadwal.events({
         'click a.cancel': function(e, tpl){
            e.preventDefault();
            Session.set('isCreating', false);
            Session.set('isEditing', false);
            Session.set('idEditing', '');
            Session.set('isDeleting', false);
         },

         'click a.deleteDataOK': function(e, tpl){
            e.preventDefault();
            deleteJADWAL();
            FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
            Session.set('isDeleting', false);
         },
         'click a.deleteData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isDeleting', true);
            Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaJADWAL);
            Session.set('idDeleting', this._id);
         },

         'click a.create': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isCreating', true);
         },
         'keyup #namaJADWAL': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               insertJADWAL(tpl);
            }
         },
         'click a.save': function(e, tpl){
            e.preventDefault();
            var x = document.querySelector('input[name="image"]').files[0]
            getBase64(x, function (rest,roolback){
             if(x =1){
               insertJADWAL(tpl,roolback);
             }else{

             }
             
            });
         },

         'click a.editData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('idEditing', this._id);
            Session.set('isEditing', true);
         },
         'keyup #namaEditJADWAL': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               updateJADWAL(tpl);
            }
         },
         'click a.saveEDIT': function(e, tpl){
            e.preventDefault();
            updateJADWAL(tpl);
         },
         'submit form.form-comments': function (e, tpl) {
            e.preventDefault();
            flxcomments(e,tpl,JADWAL);
            
        }

      });


      insertJADWAL = function (tpl,roolback) {

         
         let topikmeetingJADWAL = tpl.$('input[name="topikmeetingJADWAL"]').val();

         let image = roolback;
         
         let teamJADWAL = tpl.$('select[name="teamJADWAL"]').val();
         
         let tempatJADWAL = tpl.$('input[name="tempatJADWAL"]').val();
         
         let longtitudeJADWAL = tpl.$('input[name="longtitudeJADWAL"]').val();
         
         let latitudeJADWAL = tpl.$('input[name="latitudeJADWAL"]').val();
         
         let waktuJADWAL = tpl.$('input[name="waktuJADWAL"]').val();
         
         let statusJADWAL = tpl.$('select[name="statusJADWAL"]').val();
         

         if(!adaDATA(topikmeetingJADWAL) | !adaDATA(image) | !adaDATA(teamJADWAL) | !adaDATA(tempatJADWAL) | !adaDATA(longtitudeJADWAL) | !adaDATA(latitudeJADWAL) | !adaDATA(waktuJADWAL) | !adaDATA(statusJADWAL) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         JADWAL.insert(
         {
            
         topikmeeting: topikmeetingJADWAL,

         image: image,
         
         team: teamJADWAL,
         
         tempat: tempatJADWAL,
         
         longtitude: longtitudeJADWAL,
         
         latitude: latitudeJADWAL,
         
         waktu: waktuJADWAL,
         
         status: statusJADWAL,
         
            aktifYN: 1,
            createByID: UserID(),
            createBy:UserName(),
            createAt: new Date()
         },
         function (err, id) {
            if(err) {
               FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
            } else {
               Session.set('isCreating', false);
               FlashMessages.sendSuccess('Thanks, your data is successfully saved');
            }
         }
         );
      };


      updateJADWAL = function (tpl) {

         
         let topikmeetingEditJADWAL = tpl.$('input[name="topikmeetingEditJADWAL"]').val();
         
         let teamEditJADWAL = tpl.$('select[name="teamEditJADWAL"]').val();
         
         let tempatEditJADWAL = tpl.$('input[name="tempatEditJADWAL"]').val();
         
         let longtitudeEditJADWAL = tpl.$('input[name="longtitudeEditJADWAL"]').val();
         
         let latitudeEditJADWAL = tpl.$('input[name="latitudeEditJADWAL"]').val();
         
         let waktuEditJADWAL = tpl.$('input[name="waktuEditJADWAL"]').val();
         
         let statusEditJADWAL = tpl.$('select[name="statusEditJADWAL"]').val();
         

         if(!adaDATA(topikmeetingEditJADWAL) | !adaDATA(teamEditJADWAL) | !adaDATA(tempatEditJADWAL) | !adaDATA(longtitudeEditJADWAL) | !adaDATA(latitudeEditJADWAL) | !adaDATA(waktuEditJADWAL) | !adaDATA(statusEditJADWAL) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         JADWAL.update({_id:Session.get('idEditing')},
         { $set:{
            
         topikmeeting: topikmeetingEditJADWAL,
         
         team: teamEditJADWAL,
         
         tempat: tempatEditJADWAL,
         
         longtitude: longtitudeEditJADWAL,
         
         latitude: latitudeEditJADWAL,
         
         waktu: waktuEditJADWAL,
         
         status: statusEditJADWAL,
         
            updateByID: UserID(),
            updateBy:UserName(),
            updateAt: new Date()
         }
      },
      function (err, id) {
         if(err) {
            FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
         } else {
            Session.set('idEditing', '');
            Session.set('isEditing', false);
            FlashMessages.sendSuccess('Thanks, your data is successfully saved');
         }
      }
      );
   };

   deleteJADWAL = function () {

      if(!adaDATA(Session.get('idDeleting'))) {
         FlashMessages.sendWarning('Please select data that you want to remove . . .');
         return;
      }

      JADWAL.update({_id:Session.get('idDeleting')},
          { $set:{
             aktifYN: 0,
             deleteByID: UserID(),
             deleteBy:UserName(),
             deleteAt: new Date()
          }
       },
       function (err, id) {
          if(err) {
             FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
          } else {
             Session.set('idEditing', '');
             FlashMessages.sendSuccess('Thanks, your data is successfully saved');
          }
       }
       );
    };


    
