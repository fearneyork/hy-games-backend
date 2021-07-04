const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const { formatCategoriesData , formatUsersData, formatReviewsData, formatCommentsData, lookUpObj} = require("../db/utils/data-manipulation.js");

beforeEach(() => seed(testData));

afterAll(() => db.end());

describe('formatCategoriesData', () => {
    test('returns an empty array for no categories data passed to the function', () => {
        expect(formatCategoriesData([])).toEqual([]);
    });
    test("array of single object passed into function",()=>{
    const input = [ {
        slug: 'social deduction',
        description: "Players attempt to uncover each other's hidden role"
      }]
      expect(formatCategoriesData(input)).toEqual([[
        'social deduction',
        "Players attempt to uncover each other's hidden role"
      ]]);
    });
    test("checking for mutation of input", () => {
      const input = [ {
        slug: 'social deduction',
        description: "Players attempt to uncover each other's hidden role"
      }]
      formatCategoriesData(input)
      expect(input).toEqual([ {
        slug: 'social deduction',
        description: "Players attempt to uncover each other's hidden role"
      }])
    })
});
describe('formatUserData', () => {
    test('returns an empty array for no users data passed to the function', () => {
        expect(formatUsersData([])).toEqual([]);
    });
    test('array of single object passed into function', () => {
        const input = [{
            username: 'mallionaire',
            name: 'haz',
            avatar_url:
              'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
          }]
          expect(formatUsersData(input)).toEqual([['mallionaire','haz','https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg']]);
    }); 
    test('checking for mutation of input', () => {
      const input = [{
        username: 'mallionaire',
        name: 'haz',
        avatar_url:
          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
      }]
      formatUsersData(input);
      expect(input).toEqual([{
        username: 'mallionaire',
        name: 'haz',
        avatar_url:
          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
      }])
    });
});
describe('formatReviewsData', () => {
    test('returns an empty array for no users data passed to the function', () => {
        expect(formatReviewsData([])).toEqual([]);
    });
    test('array of single object passed into function', () => {
        const input = [{
            title: 'Agricola',
            designer: 'Uwe Rosenberg',
            owner: 'mallionaire',
            review_body: 'Farmyard fun!',
            category: 'euro game',
            created_at: new Date(1610964020514),
            votes: 1,
            review_img_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
          }]
          expect(formatReviewsData(input)).toEqual([['Agricola','Farmyard fun!','Uwe Rosenberg','https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',1,'euro game','mallionaire', new Date(1610964020514)]]);
    }); 
    test('check for mutation of input', () => {
      const input = [{
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      }]

      formatReviewsData(input)

      expect(input).toEqual([{
        title: 'Agricola',
        designer: 'Uwe Rosenberg',
        owner: 'mallionaire',
        review_body: 'Farmyard fun!',
        category: 'euro game',
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      }])
    });
});
describe('formatComments tests', () => {
  const reviewLookup = {Jenga: 2};
  const commentData = [{
    body: 'I loved this game too!',
    belongs_to: 'Jenga',
    created_by: 'bainesface',
    votes: 16,
    created_at: new Date(1511354613389)
  }];
    test('returns an empty array for no comments data passed to the function', () => {
      expect(formatCommentsData([], reviewLookup)).toEqual([]);
    });
    test('check that single object as reviewLookUp, ', () => {
      expect(formatCommentsData(commentData, reviewLookup)).toEqual([['bainesface', 2, 16, new Date(1511354613389), 'I loved this game too!']]);
    });
    test('check for mutation of input', () => {
      const reviewLookup = {Jenga: 2};
      const commentData = [{
        body: 'I loved this game too!',
        belongs_to: 'Jenga',
        created_by: 'bainesface',
        votes: 16,
        created_at: new Date(1511354613389)
      }];

      formatCommentsData(commentData, reviewLookup)

      expect(reviewLookup).toEqual({Jenga: 2})
      expect(commentData).toEqual([{
        body: 'I loved this game too!',
        belongs_to: 'Jenga',
        created_by: 'bainesface',
        votes: 16,
        created_at: new Date(1511354613389)
      }])
    });
  });
  
  
  describe('lookUpObj tests', () => {
    test('check that when passed an empty array the function returns an empty object', () => {
      const input = [];
      const actual = lookUpObj(input);
  
      expect(actual).toEqual({});
    });
    test('check that the lookUpObj has the correct key-value pair taken from review data', () => {
      const input = [{
        review_id: 3,
        title: 'Ultimate Werewolf',
        review_body: "We couldn't find the werewolf!",
        designer: 'Akihisa Okui',
        review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        votes: 5,
        category: 'social deduction',
        owner: 'bainesface',
        ceated_at: null
      }];
      expect(lookUpObj(input)).toEqual({'Ultimate Werewolf': 3});
    });
    test('check for mutation of input', () => {
      const input = [{
        review_id: 3,
        title: 'Ultimate Werewolf',
        review_body: "We couldn't find the werewolf!",
        designer: 'Akihisa Okui',
        review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        votes: 5,
        category: 'social deduction',
        owner: 'bainesface',
        ceated_at: null
      }]

      lookUpObj(input)

      expect(input).toEqual([{
        review_id: 3,
        title: 'Ultimate Werewolf',
        review_body: "We couldn't find the werewolf!",
        designer: 'Akihisa Okui',
        review_img_url: 'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        votes: 5,
        category: 'social deduction',
        owner: 'bainesface',
        ceated_at: null
      }])
    });
  });