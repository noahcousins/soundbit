// stateUtils.js
const stateAbbreviations = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const formatState = (state) => {
  return stateAbbreviations[state] || state;
};

const formatParty = (party) => {
  if (party === "Republican") {
    return "R";
  } else if (party === "Democrat") {
    return "D";
  } else {
    return party;
  }
};

const getBackgroundColor = (party) => {
  if (party === "Republican") {
    return "radial-gradient(100% 100% at 0% 0%, #cf3e3e18, transparent)";
  } else if (party === "Democrat") {
    return "radial-gradient(100% 100% at 0% 0%, #3EACCF18, transparent)";
  } else {
    return "";
  }
};

const getSvgColor = (party) => {
  if (party === "Republican") {
    return "red"; // Set red fill for Republican party
  } else if (party === "Democrat") {
    return "blue"; // Set blue fill for Democrat party
  } else {
    return ""; // Return empty string for other parties (no fill)
  }
};

export {
  stateAbbreviations,
  formatState,
  formatParty,
  getBackgroundColor,
  getSvgColor,
};

export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
