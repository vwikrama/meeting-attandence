
          /**
          * Generated from flexurio at Rab Mei  8 09:17:23 WIB 2019
          * By muhamad at Linux muhamad-X455YA 4.15.0-47-generic #50-Ubuntu SMP Wed Mar 13 10:44:52 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

         import { Template } from 'meteor/templating';
         import { Session } from 'meteor/session';
         import './anggota.html';
   
         Template.anggota.created = function () {
            Session.set('limit', 50);
            Session.set('oFILTERS', {});
            Session.set('oOPTIONS', {});
            Session.set('textSearch', '');
            Session.set('namaHeader', 'DATA ANGGOTA');
            Session.set('dataDelete', '');
            Session.set('isCreating', false);
            Session.set('isDeleting', false);
            if(!adaDATA(Session.get('pilih'))){
               Router.go('team');
            }
   
            this.autorun(function () {
                   subscribtion('anggota', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
                   subscribtion('team',{aktifYN : 1},{},0);
                  });
          };
   
           Template.anggota.onRendered(function () {
               ScrollHandler();
           });
   
           Template.anggota.helpers({
               isLockMenu: function () {
                   return isLockMenu();
               },
               namaHeader: function () {
                  return Session.get("namaHeader");
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
            anggotas: function() {
               let textSearch = '';
               if(adaDATA(Session.get('textSearch'))) {
                  textSearch = Session.get('textSearch').replace('#', '').trim();
               }
   
               let oOPTIONS = {
                  sort: {createAt: -1},
                  limit: Session.get('limit')
               }
   
               let oFILTERS = {
                  pilih : Session.get('pilih'),
                  aktifYN: 1,
                  $or: [
                  
            {nama: { $regex : new RegExp(textSearch, 'i') }},
            
            {notlep: { $regex : new RegExp(textSearch, 'i') }},
            
            {jabatan: { $regex : new RegExp(textSearch, 'i') }},
            
            {alamat: { $regex : new RegExp(textSearch, 'i') }},
            
                  {_id: { $regex : new RegExp(textSearch, 'i') }},
                  ]
               }
   
               return ANGGOTA.find(
                   oFILTERS,
                   oOPTIONS
               );
            }
         });
   
         Template.anggota.events({
            'click a.cancel': function(e, tpl){
               e.preventDefault();
               Session.set('isCreating', false);
               Session.set('isEditing', false);
               Session.set('idEditing', '');
               Session.set('isDeleting', false);
            },
   
            'click a.deleteDataOK': function(e, tpl){
               e.preventDefault();
               deleteANGGOTA();
               FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
               Session.set('isDeleting', false);
            },
            'click a.deleteData': function(e, tpl){
               e.preventDefault();
               Scroll2Top();
   
               Session.set('isDeleting', true);
               Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaANGGOTA);
               Session.set('idDeleting', this._id);
            },
   
            'click a.create': function(e, tpl){
               e.preventDefault();
               Scroll2Top();
   
               Session.set('isCreating', true);
            },
            'keyup #namaANGGOTA': function (e, tpl) {
               e.preventDefault();
               if (e.keyCode == 13) {
                  insertANGGOTA(tpl);
               }
            },
            'click a.save': function(e, tpl){
               e.preventDefault();
               insertANGGOTA(tpl);
            },
   
            'click a.editData': function(e, tpl){
               e.preventDefault();
               Scroll2Top();
   
               Session.set('idEditing', this._id);
               Session.set('isEditing', true);
            },
            'keyup #namaEditANGGOTA': function (e, tpl) {
               e.preventDefault();
               if (e.keyCode == 13) {
                  updateANGGOTA(tpl);
               }
            },
            'click a.saveEDIT': function(e, tpl){
               e.preventDefault();
               updateANGGOTA(tpl);
            },
            'submit form.form-comments': function (e, tpl) {
               e.preventDefault();
               flxcomments(e,tpl,ANGGOTA);
           }
   
         });
   
   
         insertANGGOTA = function (tpl) {
   
            
            let namaANGGOTA = tpl.$('input[name="namaANGGOTA"]').val();
            
            let notlepANGGOTA = tpl.$('input[name="notlepANGGOTA"]').val();
            
            let jabatanANGGOTA = tpl.$('input[name="jabatanANGGOTA"]').val();
            
            let alamatANGGOTA = tpl.$('input[name="alamatANGGOTA"]').val();
            
   
            if(!adaDATA(namaANGGOTA) | !adaDATA(notlepANGGOTA) | !adaDATA(jabatanANGGOTA) | !adaDATA(alamatANGGOTA) ) {
               FlashMessages.sendWarning('Please complete all of the data to be . . .');
               return;
            }
   
            ANGGOTA.insert(
            {
               
            nama: namaANGGOTA,
            
            notlep: notlepANGGOTA,
            
            jabatan: jabatanANGGOTA,
            
            alamat: alamatANGGOTA,
            
               aktifYN: 1,
               pilih : Session.get('pilih'),
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
   
   
         updateANGGOTA = function (tpl) {
   
            
            let namaEditANGGOTA = tpl.$('input[name="namaEditANGGOTA"]').val();
            
            let notlepEditANGGOTA = tpl.$('input[name="notlepEditANGGOTA"]').val();
            
            let jabatanEditANGGOTA = tpl.$('input[name="jabatanEditANGGOTA"]').val();
            
            let alamatEditANGGOTA = tpl.$('input[name="alamatEditANGGOTA"]').val();
            
   
            if(!adaDATA(namaEditANGGOTA) | !adaDATA(notlepEditANGGOTA) | !adaDATA(jabatanEditANGGOTA) | !adaDATA(alamatEditANGGOTA) ) {
               FlashMessages.sendWarning('Please complete all of the data to be . . .');
               return;
            }
   
            ANGGOTA.update({_id:Session.get('idEditing')},
            { $set:{
               
            nama: namaEditANGGOTA,
            
            notlep: notlepEditANGGOTA,
            
            jabatan: jabatanEditANGGOTA,
            
            alamat: alamatEditANGGOTA,
            
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
   
      deleteANGGOTA = function () {
   
         if(!adaDATA(Session.get('idDeleting'))) {
            FlashMessages.sendWarning('Please select data that you want to remove . . .');
            return;
         }
   
         ANGGOTA.update({_id:Session.get('idDeleting')},
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
   
   
       
   