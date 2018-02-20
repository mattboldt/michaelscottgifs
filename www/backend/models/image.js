/* global module */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Image', {
    'titles': { type: DataTypes.ARRAY(DataTypes.TEXT), required: true },
    'tags': { type: DataTypes.ARRAY(DataTypes.TEXT), required: true },
    'url': { type: DataTypes.TEXT, required: true },
  }, {
    classMethods: {
      getSearchVector: function() {
        return 'ImageText';
      },

      search: function(query) {
        if(sequelize.options.dialect !== 'postgres') {
          console.log('Search is only implemented on POSTGRES database');
          return;
        }
        var Image = this;
        query = sequelize.getQueryInterface().escape(query);
        console.log(query);
        return sequelize
          .query('SELECT * FROM "' + Image.tableName + '" WHERE "' + Image.getSearchVector() + '" @@ plainto_tsquery(\'english\', ' + query + ')', Image);
      },

      addFullTextIndex: function() {
        if(sequelize.options.dialect !== 'postgres') {
          console.log('Not creating search index, must be using POSTGRES to do this');
          return;
        }
        var searchFields = ['titles', 'tags'];
        var Image = this;

        var vectorName = Image.getSearchVector();

        sequelize
          .query('ALTER TABLE "' + Image.tableName + '" ADD COLUMN "' + vectorName + '" TSVECTOR')
          .success(function() {
            return sequelize
              .query('UPDATE "' + Image.tableName + '" SET "' + vectorName + '" = to_tsvector(\'english\', ' + searchFields.join(' || \' \' || ') + ')')
              .error(console.log);
          }).success(function() {
            return sequelize
              .query('CREATE INDEX image_search_idx ON "' + Image.tableName + '" USING gin("' + vectorName + '");')
              .error(console.log);
          }).success(function() {
            return sequelize
              .query('CREATE TRIGGER image_vector_update BEFORE INSERT OR UPDATE ON "' + Image.tableName + '" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("' + vectorName + '", \'pg_catalog.english\', ' + searchFields.join(', ') + ')')
              .error(console.log);
          }).error(console.log);
      }
    }
  });
};
