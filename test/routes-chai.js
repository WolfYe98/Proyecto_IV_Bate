const expect = require('chai').expect;
const build = require('../app/main.js');
const chaiHttp = require('chai-http');
const chai = require('chai');


chai.use(chaiHttp);

//On fastify, we use fastify.inject to make a fake request to our route.
describe('Testing routes',async ()=>{
  var app = await build();
  //var app = await build({logger:{level:'info',prettyPrint:true}});
  //Para activar los logs.
  describe('Testing /allstyles route',()=>{
    it('Should return all style names',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/allstyles'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /style/:styleName route',()=>{
    it('Should have hiphop style',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/style/hiphop'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /city/:cityName route',()=>{
    it('Should have NewYork city styles',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/city/newyork'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /founder/:founderName route',()=>{
    it('Should have a founder which name is DJ KOOL HERC',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/founder/djkoolherc'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /prices/:city route',()=>{
    it('Should have a city called Madrid',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/prices/madrid'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /generalPricesprices route',()=>{
    it('Should have a list of prices',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/generalPrices'
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /recommendation route',()=>{
    it('Should recommend a style',async ()=>{
      const res = await app.inject({
        method:'GET',
        url: '/recommendation',
        query: {brazos:3,cadera:3}
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /addStyle route',()=>{
    it('Should add the new style and return a 201 status code',async ()=>{
      const res = await app.inject({
        method:'PUT',
        url: '/addstyle/newStyle',
        body:{
          key:'19980930',
          newStyle:{
            year: 2020,
            founder: 'Bate Ye',
            city: 'Madrid',
            history: 'At this moment im creating a new style',
            description: 'This is just an style for testing my api',
            body: ["cabeza"]
          }
        }
      });
      expect(res).to.have.status(201);
    });
  });

  describe('Testing /updateStyle route',()=>{
    it('Should update a style and return 200', async()=>{
      const res = await app.inject({
        method:'POST',
        url:'/updateStyle/hiphop',
        body:{
          key:'19980930',
          updateStyleInfo:{
            styleInformation:{
              year:1976
            }
          }
        }
      });
      expect(res).to.have.status(200);
    });
  });

  describe('Testing /deleteStyle route',()=>{
    it('Should delete a style and return 200', async()=>{
      const res = await app.inject({
        method:'DELETE',
        url:'/deleteStyle/krump',
        body:{
          key:'19980930'
        }
      });
      expect(res).to.have.status(200);
    });
  });

});
