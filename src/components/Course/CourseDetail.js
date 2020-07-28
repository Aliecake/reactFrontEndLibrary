import React, { Component } from 'react';
import CourseCard from './CourseCard';
import NotFound from '../NotFound';

export default class CourseDetail extends Component {
  state = {
    course: null,
  };

  async componentDidMount() {
    const { context } = this.props;
    const { id } = this.props.match.params;
    const course = await context.data.getOneCourse(id);

    if (course) {
      this.setState({
        course: course.course,
      });
    }
  }

  render() {
    return this.state.course ? (
      <div>
        <CourseCard course={this.state.course} context={this.props} />
      </div>
    ) : (
      <NotFound noCourse />
    );
  }
}
