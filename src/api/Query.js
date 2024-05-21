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
        .join(",");

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
        const query = [{ collectionName: "courses", fields: ["name"] }];
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

export class EssentialQueries {

  static async getDepartments() {
    let result = [];
    await Queries.getDepartment()
      .then((data) => {
        result = data.queries.department
      })
      .catch((err) => {
        console.log(err);
      })
    return result
  }

  static async getRegulations() {
    let result = []
    await Queries.getRegulations()
      .then((data) => {
        result = data.queries.regulation
      })
      .catch((err) => {
        console.log(err);
        return ["Error while fetching"]
      })
    return result
  }

  static async getCourse(program, department, regulation) {
    let result = [];
    const queries = [
      {
        collectionName: "courses",
        values: {
          "program": program,
          "department": department,
          "regulation": regulation,
        },
        responseData: ["name"],
      },
    ];
    await Queries.getDocuments(queries).then((data) => {
      result = data.options.name
    })
      .catch((err) => {
        console.log(err)
      })
    return result
  }

  static async getSemester(program, department, course_name, batch_name, semester_name) {
    let result = [];
    const queries = [
      {
        collectionName: "semesters",
        values: {
          program,
          department,
          batch_name,
          course_name,
          semester_name
        },
        responseData: ["batch_name", "academic_year", "course_name", "institution", "program", "regulation", "department", "subjects", "semester_name"],
      },
    ]

    await Queries.getDocuments(queries).then((data) => {
      result = data.documents.semesters[0]
    })
      .catch((err) => {
        console.log(err)
      })
    return result
  }

  static async getBatch(program, department, regulation, course_name) {
    let result = [];
    const queries = [
      {
        collectionName: "batches",
        values: {
          "program": program,
          "department": department,
          "regulation": regulation,
          "course_name": course_name
        },
        responseData: ["batch_name", "academic_year", "course_name", "institution", "program", "regulation", "department"],
      },
    ];

    await Queries.getDocuments(queries).then((data) => {
      result = data.documents.batches[0]
    })
      .catch((err) => {
        console.log(err)
      })
    return result
  }

}

export { Queries };
