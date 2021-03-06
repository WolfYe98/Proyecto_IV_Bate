var fs=require('fs');
var BodyPartLevel = require('./bodypartlevel.js')

class Database{
  /**
  * @function constructor
  * @summary Constructor de la clase Database, recibe un parámetro path y extrae los datos de un fichero json
  * @author Bate Ye
  * @param {string} path Ruta al archivo que guardan los datos
  */
  constructor(path){
    if(path != undefined){
      this.path = path;
      try{
        this.dataFile = fs.readFileSync(this.path,'utf-8');
        this.data = JSON.parse(this.dataFile);
      }
      catch(err){
        this.data = undefined;
      }
    }
    else{
      this.data =
      {
        "hiphop": {
          "year": 1970,
          "founder": "DJ Kool Herc",
          "city": "New York",
          "history": "Hip-Hop en la actualidad lo conocen como un estilo de danza urbana freestyle, pero en realidad Hip-Hop es una cultura generada en el sur de Bronx, New York en los años 70s por los jovenes afroamericanos y LatinoAmericanos. En un principio Hip-Hop se refería a 4 grandes elementos: rap, breaking, graffiti y djing. Durante los 70s, 80s, el único estilo de baile del Hip-Hop era solamente breaking, hasta que empezaron a desarrollar más pasos de baile sin movimientos en el suelo (top-rocks), y entonces nació el estilo de baile llamado Hip-Hop",
          "description": "Hip-Hop es un baile que requiere muchos bounces (rebotes), es más, lo primero que se enseña en Hip-Hop son los 2 tipos de bounce que hay, el up y el down. En Hip-Hop es muy importante que nunca se olviden del bounce, ya que es lo fundamental de este estilo. Requiere muchas prácticas para dominar el bounce hasta meterlo en pasos más complejos como el slide, ball change, kick ball change etc... Otra parte muy importante es la musicalidad, es decir, saber contar los 8s de la música. Hoy en día, las personas suelen bailar Hip-Hop con música de diferentes estilos, pero en su inicio, Hip-Hop siempre se bailaba con rap old school.",
          "body":["piernas","pecho","cadera","brazos"]
        },
        "krump": {
          "year": 2000,
          "founder": "Tight Eyez",
          "city": "Los Angeles",
          "history": "",
          "description": "",
          "body":["brazos","piernas","cadera"]
        }
      };
    }
  }
    /**
    * @function getStyles
    * @summary Método que devuelve los estilos de baile.
    * @author Bate Ye
    * @returns {Array} Devuelve un array con los nombres de los diferentes estilos de baile.
    */
  getStyles(){
    if(this.data != undefined){
      return Object.keys(this.data);
    }
    else{
      return undefined;
    }
  }
    /**
    * @function getStyleByName
    * @summary Método que devuelve todo un objeto de un estilo.
    * @author Bate Ye
    * @param {string} estilo Nombre del estilo que está buscando.
    * @returns {(Object|String)} objeto del estilo si este existe, si no existe devuelve un string de aviso.
    */
  getStyleByName(estilo){
    if(this.data != undefined){
      var style = this.data[estilo.toLowerCase()];
      if(style != undefined){
        return style;
      }
      else{
        throw new Error('This style is not included');
      }
    }
    else{
      return "Aun no tenemos ningún estilo, puedes añadir tu uno!";
    }
  }
  /**
  * @function getStyleByFounder
  * @summary Método que devuelve todo un objeto de un estilo, por el fundador.
  * @author Bate Ye
  * @param {string} founder Nombre del fundador que está buscando.
  * @returns {(Object|String)} objeto del estilo si este existe, si no existe devuelve un string de aviso.
  */
  getStyleByFounder(founder){
    if(this.data != undefined){
      var data_keys = this.getStyles();
      for(var i = 0; i < data_keys.length; i++){
        var fou = this.data[data_keys[i]]['founder'];
        fou= fou.split(' ').join('');
        if(fou.toLowerCase() == founder.toLowerCase()){
          return this.data[data_keys[i]];
        }
      }
      throw new Error('Could not find this founder');
    }
    else{
      return "Aun no tenemos ningún estilo, puedes añadir tu uno!";
    }
  }
  /**
  * @function getStylesByCity
  * @summary Método que devuelve un array de objetos que la ciudad coincida con la ciudad introducida.
  * @author Bate Ye
  * @param {string} city Nombre de la ciudad que está buscando.
  * @returns {(Array|String)} array de los nombres de los estilos que coincidan en la ciudad, si no existe ninguno devuelve un string de aviso.
  */
  getStylesByCity(city){
    if(this.data != undefined){
      var data_keys = this.getStyles();
      var styles = [];
      var ci;
      for(var i = 0; i < data_keys.length; i++){
        ci = this.data[data_keys[i]]['city'];
        ci= ci.split(' ').join(''); //This line is for delete all spaces
        if(ci.toLowerCase() == city.toLocaleLowerCase()){
          styles.push(data_keys[i]);
        }
      }
      if(styles.length > 0){
        return styles;
      }
      else{
        throw new Error('This city is not in our DB');
      }
    }
    else{
      throw new Error('There is no data yet');
    }
  }
  /**
  * @function addStyle
  * @summary Método para añadir un estilo de baile, para añadirlo hay que escribir todos los datos del estilo.
  * @author Bate Ye
  * @param {string} styleName Nombre del estilo nuevo que queremos incluir.
  * @param {number} year Año en el que se fundó el estilo.
  * @param {string} founder Nombre del fundador del estilo.
  * @param {string} city Nombre de la ciudad de origen.
  * @param {string} history La historia resumida del estilo, como empezó y un poco de evolución.
  * @param {string} description Describir un poco como se baila este estilo.
  * @param {Array} body Array de partes del cuerpo en el que se va a utilizar.
  * @returns {(Array|String)} array de los nombres de los estilos que coincidan en la ciudad, si no existe ninguno devuelve un string de aviso.
  */
  addStyle(styleName, year, founder, city, history, description, body){
    if(!styleName || !year || !founder || !city || !history || !description || !(body.length >0)){
      throw new Error('Some params are not writed');
    }
    else{
      var new_object={};
      new_object[styleName.toLowerCase()] = {
        "year": year,
        "founder":founder,
        "city":city,
        "history":history,
        "description":description,
        "body":body
      };

      if(!this.getStyles().toString().toLowerCase().includes(styleName.toLowerCase())){
        this.data = Object.assign(new_object,this.data);
        return new_object;
      }
      else{
        throw new Error('This style has been already added');
      }
    }
  }
  /**
  * @function deleteStyle
  * @summary Método para añadir un estilo de baile, para añadirlo hay que escribir todos los datos del estilo.
  * @author Bate Ye
  * @param {string} styleName Es el nombre del estilo de baile que queremos borrar.
  * @returns {string} Devuelve un string indicando que se ha eliminado el estilo o que el estilo no existe en la database.
  */
  deleteStyle(styleName){
    if(this.data != undefined){
      if(this.getStyles().toString().toLowerCase().includes(styleName.toLowerCase())){
        delete this.data[styleName.toLowerCase()];
      }
      else{
        throw new Error('Style does never been in the DB');
      }
    }
  }
  /**
  * @function updateStyle
  * @summary Método para añadir un estilo de baile, para añadirlo hay que escribir todos los datos del estilo.
  * @author Bate Ye
  * @param {string} styleName Es el nombre del estilo de baile que queremos borrar.
  * @param {Object} styleInformation Contiene la nueva información del estilo.
  */
  updateStyle(styleName, styleInformation){
    var n = styleName.replace(' ','');
    n = n.toLowerCase();
    if(this.data[n] != undefined){
      var keys = Object.keys(styleInformation);
      for(var i = 0; i < keys.length; i++){
        this.data[n][keys[i]] = styleInformation[keys[i]];
      }
    }
    else{
      throw new Error('Style does not included');
    }
  }
  writeFile(){
    if(this.path != undefined){
      fs.writeFile(this.path,JSON.stringify(this.data,null,4),function(err){
        if(err){
          throw err;
        }
      });
    }
  }

}

module.exports = Database;
