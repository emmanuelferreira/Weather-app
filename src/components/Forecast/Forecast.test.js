import React from 'react';
import TestRenderer from 'react-test-renderer';
import Forecast from './Forecast';
import Conditions from '../Conditions/Conditions';
import waitUntil from 'async-wait-until';
import nock from 'nock';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow, mount } from 'enzyme';

const API_KEY = '1d4ded67ad76eeda7ec0ca23379a912b';
Enzyme.configure({ adapter: new Adapter() });
 jest.setTimeout(10000);

// Component test
it ('renders a snaphsot', () => {
  const tree = TestRenderer.create(<Forecast />).toJSON();
  expect(tree).toMatchSnapshot();
});

//get request test
describe('<Forecast />', () => {

  beforeAll( () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
      nock('https://api.openweathermap.org/data/2.5')
      .persist()
      .get(`/forecast?q=pretoria&appid=${API_KEY}&units=metric`)
      .reply( 200 , { data: 20 })
  })

  it('Component fetching weather from API', async(done)=> {
    const root = shallow(<Forecast />);

    let componentForecast = {};
    await waitUntil( () => {
      console.log(root.state("responseObj"));
      console.log(root.state("loading"))
      console.log(root.state("error"))
       root.state('responseObj').cod !== null
     })

    expect(componentForecast.data).toEqual(20);
    done();
  })
});


