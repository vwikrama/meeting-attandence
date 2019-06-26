
          /**
          * Generated from flexurio at Rab Feb 20 11:16:02 WIB 2019
          * By muhamad at Linux muhamad-X455YA 4.15.0-29-generic #31-Ubuntu SMP Tue Jul 17 15:39:52 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
          */

         import { Template } from 'meteor/templating';
         import { Session } from 'meteor/session';
         import './laporan.html';
   
         
   
         Template.laporan.created = function () {
            Session.set('limit', 50);
            Session.set('oFILTERS', {});
            Session.set('oOPTIONS', {});
            Session.set('textSearch', '');
            Session.set('namaHeader', 'DATA LAPORAN');
            Session.set('dataDelete', '');
            Session.set('isCreating', false);
            Session.set('isDeleting', false);
   
            this.autorun(function () {
                   subscribtion('anggota',{aktifYN: 1},{},0); 
                   subscribtion('jadwal',{aktifYN: 1},{},0); 
                  });
          };
   
           Template.laporan.onRendered(function () {
               ScrollHandler();
           });
   
           Template.laporan.helpers({
              anggota: function(){
                 return ANGGOTA.find().count()
              },

              jadwal: function(){
                 return JADWAL.find().fetch()
              },
  
            isLockMenu: function () {
                   return isLockMenu();
               },
   
               isActionPRINT: function () {
                   return isAdminActions(Session.get('sURLMenu'), 'PRINT');
               },
               
            sTinggiPopUp: function () {
               return 0.6*($(window).height());
            },
          
            laporan: function() {
               let textSearch = '';
               if(adaDATA(Session.get('textSearch'))) {
                  textSearch = Session.get('textSearch').replace('#', '').trim();
               }
               return JADWAL.find(
                 {},
                {}
               );
            }
         });
   
         Template.laporan.events({
            
         });
    
   