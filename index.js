const Alexa = require('ask-sdk-core');

const menu = [
	['Vada, sambhar, chutney, puri bhaji, corn flakes, sprouts, bread jam, milk, tea and coffee',
	'Tomato Rice, dhal makhani, Veg sabzi, aloo methi, salad, roti, stamed rice, curd, sambhar or rasam, chutney and papad',
	'jeera rice, dhal tadka, rajma masala, mix vegetable, roti, salad, steamed rice, curd, sambhar or rasam, pickle'],

	['Pessarattu Upma, Ginger Chutney, Gobhi Paratha, Curd, Pickle, Bournvita, Milk, Tea, Coffee, Sprouts',
	'Arhar Dhal, Chole, Bhindi Fry, Methi Puri, Boondhi Raita, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, Fryums, Chutney',
	'Dhal Makhani, Pudina Rice, Veg Kofta, Masala Corn, Salad, Fryums, Roti, Steamed Rice, Curd, Sambar or Rasam, Pickle'],

	['Rava Idli, Sambar, Chutney, Stuffed Kulcha, Curd, Bread Butter,Boiled Egg or Banana, Milk, Tea, Coffee, Sweet Corn',
	'Veg Pullav, Jeera Dhal Fry, Black Channa Masala, Corn Palak, Gulab Jamun, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, Fryums, Chutney',
	'Kashmiri Pulao, Dhal Tadka, Kadhai Paneer, Butter Chicken, Boondi Raita, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, Pickle'],

	['Masala Dosa, Sambar, Chutney, Poha, Chocos, Milk, Tea, Coffee, Sprouts',
	'Dhal Khichdi, Navratan Dhaal, veg Sabzi, Aloo Baigan, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, fryums, Chutney',
	'Corriender Rice, Toor Dhal, Veg Handi, Dum Aloo, Boondi, Salad, Fryums, Roti, Steamed Rice, Curd, Sambar or Rasam, Pickle'],

	['Mysore Bonda, Chutney, Mix Paratha, Pudina Chutney, Bread Butter,Boiled Egg, Banana, Milk, Tea, Coffee, Sweet Corn',
	'Jeera Rice, Channa Dhal Tadka, Rajma Masala, Jeera Aloo, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, Fryums, Chutney',
	'Dhal Makhani, Egg Bhurji, Aloo 65, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, Pickle'],

	['Pongal, Chutney, Sandwich with pudina chutney and sweet chutney, Pan Cakes, Boost, Milk, Tea, Coffee, Sprouts',
	'Onion Garlic Rice, Achari Dhal, Chole, Green sabzi, Ajvain Puri, Boondi Raita, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, Fryums, Chutney',
	'Veg Fried Rice, Navratan Dhal Tadka, Manchurian, Black Chana Dry, Cut Fruits, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, Pickle'],
	
	['Masala Dosa, Sambar, Chutney, Chole Bature, Bread Jam, Milk, Tea, Coffee, Sweet Corn',
	'Lemon Rice, Punjabi Dhal, Kadi Pakodi, Gajar Methi Matar, Sprouts, Roti, Steamed Rice, Curd, Sambar or Rasam, Fryums, Chutney',
	'Veg Biryani, Chicken Biryani, Veg Raita, Dhal Tadka, Shahi Paneer, Salad, Roti, Steamed Rice, Curd, Sambar or Rasam, Pudina Chutney, Pickle, Ice Cream']
];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to Bits Hyderabad Mess, you can ask me for something like Friday Dinner menu!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('from launch-request-handler', speechText)
      .getResponse();
  }
};

const ReadMenuIntenthandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'ReadMenuIntent';
  },
  handle(handlerInput) {
  	const response = handlerInput.responseBuilder;
  	var day = handlerInput.requestEnvelope.request.intent.slots.day.resolutions.resolutionsPerAuthority[0].values[0].value.id;
  	var meal = handlerInput.requestEnvelope.request.intent.slots.meals.resolutions.resolutionsPerAuthority[0].values[0].value.id;
  	var output_msg = menu[day][meal];
    return handlerInput.responseBuilder
      .speak('Here is the Menu, ' + output_msg.toUpperCase())
      .withSimpleCard('Menu', output_msg.toUpperCase())
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hi, You can ask me for something like friday lunch menu';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Help', speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('End', speechText)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I didn\'t get you Please say again.')
      .reprompt('Sorry, I didn\'t get you Please say again.')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ReadMenuIntenthandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();
