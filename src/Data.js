import Cookies from 'js-cookie';
import ls from 'local-storage';
import config from './config';

export default class Data {
  api(path, method, body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path || 'http://localhost:5000/api';

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );

      options.headers.Authorization = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // USER
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      emailAddress,
      password,
    });

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    if (response.status === 401) {
      return null;
    }
    //500 internal
    throw new Error();
  }

  async createUser(user) {
    const response = await this.api(`/users`, 'POST', user);
    // 500 error if user already exists
    if (response.status === 201) {
      return [];
    }
    if (response.status === 400) {
      return response.json().then(data => data);
    }
    //500 internal
    throw new Error();
  }

  // COURSES
  async getCourses() {
    const response = await this.api('/courses', 'GET');
    if (response.status === 200) {
      console.log(`200 OK - got courses`);
      const res = response.json();
      return res;
    }
    console.log(`no courses`);
  }

  async getOneCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET');

    if (response.status === 200) {
      return response.json();
    } else if (response.status === 404) {
      console.log(response, `course doesnt exist`);
      return null
    }
    
  }

  async createCourse(course) {
    // Cookies parsed to JSON
    let emailAddress = null;
    let password = null;

    // only auth users can add a course
    if (Cookies.get('authenticatedUser')) {
      const user = JSON.parse(Cookies.get('authenticatedUser'));
      const hashPassword = Cookies.get('password');
      emailAddress = user.user.emailAddress;
      password = atob(JSON.parse(hashPassword));
    }

    const response = await this.api(`/courses`, 'POST', course, true, {
      emailAddress,
      password,
    });
    
    if (response.status === 201) {
      console.log(response, `course added`);
      return null;
    } else if (response.status === 400) {
      return response.json().then(data => data);
    }
    //500 internal
      throw new Error()
  }

  async updateCourse(course) {
    // Cookies parsed to JSON
    let emailAddress = null;
    let password = null;

    // only auth users can add a course
    if (Cookies.get('authenticatedUser')) {
      const user = JSON.parse(Cookies.get('authenticatedUser'));
      const hashPassword = Cookies.get('password');
      emailAddress = user.user.emailAddress;
      password = atob(JSON.parse(hashPassword));
    }

    const response = await this.api(
      `/courses/${course.id}`,
      'PUT',
      course,
      true,
      { emailAddress, password }
    );

    if (response.status === 204) {
      console.log(`course updated`);
      return null
    } else if (response.status === 400) {
     
      return response.json().then(data => data);
    }
    //500 internal
    throw new Error();
  }

  async handleDelete(id, emailAddress) {
    // get hashed password from cookies, and pass it. Not ideal, would prefer to use passport or similar.
    const hashPassword = Cookies.get('password');
    const password = atob(JSON.parse(hashPassword));

    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
      emailAddress,
      password,
    });
    console.log(response.status);
    if (response.status === 204) {
      // remove from local storage
      ls.remove(id);
      console.log(`deleted`);
    } else if (response.status === 403) {
      console.log(response.status, `forbidden`);
      return response.json().then(data => data);
    } else {
      //500 internal
      throw new Error();
    }
  }
}
