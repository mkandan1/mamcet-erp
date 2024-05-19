import { API } from "./API";

class Queries {
  static getQueries = (query) => {
    return new Promise(async (resolve, reject) => {
      const convertedQuery = this.constructQueriesParams(query);
      const result = await API.getRequest("/queries/query", convertedQuery);
      if (result.success) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  };

  static getDocuments = (queries) => {
    return new Promise(async (resolve, reject) => {
      try {
        const convertedQuery = this.constructDocumentQueriesParams(queries);
        const result = await API.getRequest(
          "/queries/documents",
          convertedQuery
        );
        if (result.success) {
          resolve(result);
        } else {
          reject(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  static constructDocumentQueriesParams(queries) {
    const queryStrings = queries.map((queryObj) => {
      const { collectionName, values, responseData } = queryObj;
      // Constructing the query string from values object
      const queryString = Object.entries(values)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      // Constructing the response format string
      const responseFormatString = responseData.join(",");

      return `collection=${collectionName}&values=${queryString}&responseFormat=${responseFormatString}`;
    });

    return queryStrings;
  }

  static async getRegulations() {
    try {
      return new Promise(async (resolve, reject) => {
        const query = [{ collectionName: "courses", fields: ["regulation"] }];
        this.getQueries(query).then((data) => {
          if (data.success) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    } catch (err) {
      return err;
    }
  }

  static async getDepartment() {
    try {
      return new Promise(async (resolve, reject) => {
        const query = [{ collectionName: "courses", fields: ["department"] }];
        this.getQueries(query).then((data) => {
          if (data.success) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    } catch (err) {
      return err;
    }
  }

  static async getCourse() {
    try {
      return new Promise(async (resolve, reject) => {
        const query = [{ collectionName: "courses", fields: ["courseName"] }];
        this.getQueries(query).then((data) => {
          if (data.success) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });
    } catch (err) {
      return err;
    }
  }

  static constructQueriesParams(queries) {
    const query = queries
      .map((query) => {
        const { collectionName, fields } = query;
        const fieldArray = Array.isArray(fields) ? fields : [fields];
        const fieldString = fieldArray.join(",");
        return `${collectionName}=${fieldString}`;
      })
      .join("&");

    return query;
  }
}

export { Queries };
