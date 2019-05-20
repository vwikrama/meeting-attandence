
          /**
          * Generated from flexurio at Rab Mei  8 09:17:23 WIB 2019
          * By muhamad at Linux muhamad-X455YA 4.15.0-47-generic #50-Ubuntu SMP Wed Mar 13 10:44:52 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

         import { Template } from 'meteor/templating';
         import { Session } from 'meteor/session';
         import './invt.html';
   
         Template.invt.created = function () {
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
               // subscribtion('anggota', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
               subscribtion('team',{aktifYN : 1},{},0);
            });
          };
           
           

           Template.invt.onRendered(function () {
               ScrollHandler();
           });
   
           Template.invt.helpers({
               
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
   
         Template.invt.events({
            
            'click a.save': function(e, tpl){
               e.preventDefault();
               insertANGGOTA(tpl);
               
            },
   
         });
   
   
         insertANGGOTA = function (tpl) {
   
            
            let namaANGGOTA = tpl.$('input[name="namaANGGOTA"]').val();
            
            let notlepANGGOTA = tpl.$('input[name="notlepANGGOTA"]').val();
            
            let jabatanANGGOTA = tpl.$('select[name="jabatanANGGOTA"]').val();
            
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