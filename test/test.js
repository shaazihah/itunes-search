const chai = require("chai")
const expect = chai.expect
require("isomorphic-fetch")
it('API works', async()=>{
   const API = await fetch(`https://itunes.apple.com/search?term=drake&limit=10&entity=song`);
   const fetchedData= await API.json()
   expect(fetchedData.results[0].kind).to.equal("song")
});