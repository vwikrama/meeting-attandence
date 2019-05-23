
          /**
          * Generated from flexurio at Mon May 20 13:21:18 WIB 2019
          * By restu at Linux mozart-inspiron-n4050 4.15.0-47-generic #50-Ubuntu SMP Wed Mar 13 10:44:52 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

      import { Template } from 'meteor/templating';
      import { Session } from 'meteor/session';
      import './absen.html';

      Template.absen.created = function () {
         Session.set('limit', 50);
         Session.set('oFILTERS', {});
         Session.set('oOPTIONS', {});
         Session.set('textSearch', '');
         Session.set('namaHeader', 'DATA ABSEN');
         Session.set('dataDelete', '');
         Session.set('isCreating', false);
         Session.set('isDeleting', false);
         if(!adaDATA(Session.get('absensi'))){
            Router.go('jadwal');
         }

         this.autorun(function () {
            subscribtion('anggota', {aktifYN:1}, {}, 0)
            subscribtion('absen', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
         });
       };

        Template.absen.onRendered(function () {
            ScrollHandler();
        });

        Template.absen.helpers({
            anggota:function(){
               return ANGGOTA.find().fetch();
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
         absens: function() {
            let textSearch = '';
            if(adaDATA(Session.get('textSearch'))) {
               textSearch = Session.get('textSearch').replace('#', '').trim();
            }

            let oOPTIONS = {
               sort: {createAt: -1},
               limit: Session.get('limit')
            }

            let oFILTERS = {
               Jadawl:Session.get('absensi'),
               aktifYN: 1,
               $or: [
               
         {nama: { $regex : new RegExp(textSearch, 'i') }},
         
         {jabatan: { $regex : new RegExp(textSearch, 'i') }},
         
         {keterangan: { $regex : new RegExp(textSearch, 'i') }},
         
               {_id: { $regex : new RegExp(textSearch, 'i') }},
               ]
            }

            return ABSEN.find(
                oFILTERS,
                oOPTIONS
            );
         }
      });

      Template.absen.events({
         'click a.cancel': function(e, tpl){
            e.preventDefault();
            Session.set('isCreating', false);
            Session.set('isEditing', false);
            Session.set('idEditing', '');
            Session.set('isDeleting', false);
         },

         'click a.deleteDataOK': function(e, tpl){
            e.preventDefault();
            deleteABSEN();
            FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
            Session.set('isDeleting', false);
         },
         'click a.deleteData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isDeleting', true);
            Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaABSEN);
            Session.set('idDeleting', this._id);
         },

         'click a.create': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isCreating', true);
         },
         'keyup #namaABSEN': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               insertABSEN(tpl);
            }
         },
         'click a.save': function(e, tpl){
            e.preventDefault();
            insertABSEN(tpl);
         },

         'click a.editData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('idEditing', this._id);
            Session.set('isEditing', true);
         },
         'keyup #namaEditABSEN': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               updateABSEN(tpl);
            }
         },
         'click a.saveEDIT': function(e, tpl){
            e.preventDefault();
            updateABSEN(tpl);
         },
         'submit form.form-comments': function (e, tpl) {
            e.preventDefault();
            flxcomments(e,tpl,ABSEN);
        }

      });


      insertABSEN = function (tpl) {

         let namaABSEN = tpl.$('select[name="namaABSEN"]').val();
         
         let jabatanABSEN = tpl.$('input[name="jabatanABSEN"]').val();
         
         let keteranganABSEN = tpl.$('input[name="keteranganABSEN"]').val();
         

         if(!adaDATA(namaABSEN) | !adaDATA(jabatanABSEN) | !adaDATA(keteranganABSEN) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         ABSEN.insert(
         {
            
         nama: namaABSEN,
         
         jabatan: jabatanABSEN,
         
         keterangan: keteranganABSEN,
         
            aktifYN: 1,
            Jadawl:Session.get('absensi'),
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


      updateABSEN = function (tpl) {

         
         let namaEditABSEN = tpl.$('input[name="namaEditABSEN"]').val();
         
         let jabatanEditABSEN = tpl.$('input[name="jabatanEditABSEN"]').val();
         
         let keteranganEditABSEN = tpl.$('input[name="keteranganEditABSEN"]').val();
         

         if(!adaDATA(namaEditABSEN) | !adaDATA(jabatanEditABSEN) | !adaDATA(keteranganEditABSEN) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         ABSEN.update({_id:Session.get('idEditing')},
         { $set:{
            
         nama: namaEditABSEN,
         
         jabatan: jabatanEditABSEN,
         
         keterangan: keteranganEditABSEN,
         
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

   deleteABSEN = function () {

      if(!adaDATA(Session.get('idDeleting'))) {
         FlashMessages.sendWarning('Please select data that you want to remove . . .');
         return;
      }

      ABSEN.update({_id:Session.get('idDeleting')},
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