
// defining a class to make these widely used functionalities reusable
class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      /* 14: Making API filtering better: Filtering */
      let queryObj = { ...this.queryString };
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((el) => delete queryObj[el]);
  
      /* 15: Advanced Filtering */
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
      // queryObj = JSON.parse(queryStr);
  
      // let query = Car.find(queryObj);
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this; //
      // "this" => here it is entire object and V R returning the obj so that V can chain other features
    }
  
    sort() {
      /* 16: SORTING */
      if (this.queryString.sort) {
        // queryStr => getAllCars?brand=Maruti%20Suzuki&sort=price,mileage
        // console.log(req.query.sort);
        // console.log(typeof req.query.sort);
        let sortBy = this.queryString.sort.split(",").join();
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("price");
      }
  
      return this;
    }
  
    limitFields() {
      /* 17: Fields Limiting: PROJECTION */
      if (this.queryString.fields) {
        // queryStr = getAllCars?brand=Tata&fields=price,name,brand
        const fields = this.queryString.fields.split(",").join(" ");
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select("-__v");
      }
  
      return this;
    }
  
    paginate() {
      /* 18: PAGINATION */
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit; // (X)
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }

module.exports = APIFeatures;