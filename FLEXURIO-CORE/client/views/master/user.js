
          /**
          * Generated from flexurio at Kam Mei 16 10:11:35 WIB 2019
          * By muhamad at Linux muhamad-X455YA 4.15.0-47-generic #50-Ubuntu SMP Wed Mar 13 10:44:52 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

      import { Template } from 'meteor/templating';
      import { Session } from 'meteor/session';
      import './user.html';

      Template.user.created = function () {
         Session.set('limit', 50);
         Session.set('oFILTERS', {});
         Session.set('oOPTIONS', {});
         Session.set('textSearch', '');
         Session.set('namaHeader', 'DATA USER');
         Session.set('dataDelete', '');
         Session.set('isCreating', false);
         Session.set('isDeleting', false);

         this.autorun(function () {
                subscribtion('user', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
         });
       };

        Template.user.onRendered(function () {
            ScrollHandler();
        });

        Template.user.helpers({
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
         users: function() {
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
               
         {nama: { $regex : new RegExp(textSearch, 'i') }},
         
         {notlep: { $regex : new RegExp(textSearch, 'i') }},
         
         {alamat: { $regex : new RegExp(textSearch, 'i') }},
         
         {latitude: { $regex : new RegExp(textSearch, 'i') }},
         
         {longtitude: { $regex : new RegExp(textSearch, 'i') }},
         
               {_id: { $regex : new RegExp(textSearch, 'i') }},
               ]
            }

            return USER.find(
                oFILTERS,
                oOPTIONS
            );
         }
      });

      Template.user.events({
         'click a.cancel': function(e, tpl){
            e.preventDefault();
            Session.set('isCreating', false);
            Session.set('isEditing', false);
            Session.set('idEditing', '');
            Session.set('isDeleting', false);
         },

         'click a.deleteDataOK': function(e, tpl){
            e.preventDefault();
            deleteUSER();
            FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
            Session.set('isDeleting', false);
         },
         'click a.deleteData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isDeleting', true);
            Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaUSER);
            Session.set('idDeleting', this._id);
         },

         'click a.create': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isCreating', true);
         },
         'keyup #namaUSER': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               insertUSER(tpl);
            }
         },
         'click a.save': function(e, tpl){
            e.preventDefault();
            insertUSER(tpl);
         },

         'click a.editData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('idEditing', this._id);
            Session.set('isEditing', true);
         },
         'keyup #namaEditUSER': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               updateUSER(tpl);
            }
         },
         'click a.saveEDIT': function(e, tpl){
            e.preventDefault();
            updateUSER(tpl);
         },
         'submit form.form-comments': function (e, tpl) {
            e.preventDefault();
            flxcomments(e,tpl,USER);
        }

      });


      insertUSER = function (tpl) {

         
         let namaUSER = tpl.$('input[name="namaUSER"]').val();
         
         let notlepUSER = tpl.$('input[name="notlepUSER"]').val();
         
         let alamatUSER = tpl.$('input[name="alamatUSER"]').val();
         
         let latitudeUSER = tpl.$('input[name="latitudeUSER"]').val();
         
         let longtitudeUSER = tpl.$('input[name="longtitudeUSER"]').val();
         

         if(!adaDATA(namaUSER) | !adaDATA(notlepUSER) | !adaDATA(alamatUSER) | !adaDATA(latitudeUSER) | !adaDATA(longtitudeUSER) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         USER.insert(
         {
            
         nama: namaUSER,
         
         notlep: notlepUSER,
         
         alamat: alamatUSER,
         
         latitude: latitudeUSER,
         
         longtitude: longtitudeUSER,
         
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


      updateUSER = function (tpl) {

         
         let namaEditUSER = tpl.$('input[name="namaEditUSER"]').val();
         
         let notlepEditUSER = tpl.$('input[name="notlepEditUSER"]').val();
         
         let alamatEditUSER = tpl.$('input[name="alamatEditUSER"]').val();
         
         let latitudeEditUSER = tpl.$('input[name="latitudeEditUSER"]').val();
         
         let longtitudeEditUSER = tpl.$('input[name="longtitudeEditUSER"]').val();
         

         if(!adaDATA(namaEditUSER) | !adaDATA(notlepEditUSER) | !adaDATA(alamatEditUSER) | !adaDATA(latitudeEditUSER) | !adaDATA(longtitudeEditUSER) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         USER.update({_id:Session.get('idEditing')},
         { $set:{
            
         nama: namaEditUSER,
         
         notlep: notlepEditUSER,
         
         alamat: alamatEditUSER,
         
         latitude: latitudeEditUSER,
         
         longtitude: longtitudeEditUSER,
         
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

   deleteUSER = function () {

      if(!adaDATA(Session.get('idDeleting'))) {
         FlashMessages.sendWarning('Please select data that you want to remove . . .');
         return;
      }

      USER.update({_id:Session.get('idDeleting')},
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


    
