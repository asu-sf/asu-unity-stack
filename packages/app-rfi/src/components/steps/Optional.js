// @ts-check
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import {
  RfiTextInput,
  RfiDatepicker,
  RfiTextArea,
  RfiSelect,
} from "../controls";

// Options
function getCountryOptions(resultsArrayOfObjects) {
  // TODO Resolve eslint error when dust settles. Not hurting anything for now.
  // eslint-disable-next-line no-return-assign
  const results = resultsArrayOfObjects.map(co => ({
    value: co.countryCodeTwoChar,
    label: co.description,
  }));
  results.unshift({
    value: "",
    label: "-- select state or province --",
  });
  return results;
}

function getStateOptions(resultsArrayOfObjects, formikValues) {
  // Only return state options for US and CA.
  if (!(formikValues.Country === "US" || formikValues.Country === "CA")) {
    return [
      {
        value: "",
        label: "",
      },
    ];
  }

  // formikValues.Country will either be US or CA if we made it here.
  // Filter so we only have that array member.
  const arrayWithStateObject = resultsArrayOfObjects.filter(
    country => country.countryCodeTwoChar === formikValues.Country
  );
  // Destructure states from arrayWithStateObject[0].states
  const {
    0: { states },
  } = arrayWithStateObject;
  // Filter out problematic IGD value.
  const arrayOfStates = states.filter(country => country.stateCode !== "IGD");

  // TODO Resolve eslint error when dust settles. Not hurting anything for now.
  // eslint-disable-next-line no-return-assign
  const results = arrayOfStates.map(st => ({
    value: st.description,
    label: st.description,
  }));
  results.unshift({
    value: "",
    label: "-- select state or province --",
  });
  return results;
}

// Fetch Country Options from Data Potluck's readable stream service.
async function fetchCountries(optionsCallback, formikValues) {
  // fetch("https://api.myasuplat-dpl.asu.edu/api/codeset/countries?include=states")
  const serviceUrl =
    "https://api.myasuplat-dpl.asu.edu/api/codeset/countries?include=states";

  return fetch(serviceUrl)
    .then(response => response.body)
    .then(rb => {
      const reader = rb.getReader();
      return new ReadableStream({
        start(controller) {
          // The following function handles each data chunk
          function push() {
            // "done" is a Boolean and value a "Uint8Array"
            reader.read().then(({ done, value }) => {
              // If there is no more data to read
              if (done) {
                controller.close();
                return;
              }
              // Get the data and send it to the browser via the controller
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });
    })
    .then(stream => {
      // Respond with our stream
      return new Response(stream, {
        headers: { "Content-Type": "application/json" },
      }).text();
    })
    .then(result => {
      // Parse results
      const resultJson = JSON.parse(result);
      const resultsArrayOfObjects = Object.values(resultJson);
      // Format for select options.
      const results = optionsCallback(resultsArrayOfObjects, formikValues);
      // console.log(results, "Results");
      return results;
    })
    .catch(error => new Error(error));
}

const veteranStatusOptions = [
  { value: "None", label: "None" },
  { value: "Active Duty", label: "Active Duty" },
  { value: "National Guard", label: "National Guard" },
  { value: "Veteran", label: "Veteran" },
  { value: "Armed forces reserve", label: "Armed forces reserve" },
  { value: "Spouse/Dependent", label: "Spouse/Dependent" },
];

// Datepicker note: see https://stackblitz.com/edit/demo-react-formik-datepicker

// Component

const Optional = () => {
  const [countryOptions, setCountries] = useState([
    {
      value: "error",
      label: "Load failed. Please try again in 5 minutes.",
    },
  ]);
  const [stateOptions, setStates] = useState([
    {
      value: "error",
      label: "Load failed. Please try again in 5 minutes.",
    },
  ]);
  const [statesDisabled, setStatesDisabled] = useState(true);

  // Surface values from Formik context
  const { values } = useFormikContext();

  // Zip
  useEffect(() => {
    // Default to required code from previous step.
    values.Zip = values.ZipCode;
  }, []);

  // Countries
  useEffect(() => {
    // Fetch country options.
    fetchCountries(getCountryOptions, values).then(data => {
      // Set state on countryOptions.
      setCountries(data);
    });
  }, []); // Run only once

  // States and Provinces
  useEffect(() => {
    // Fetch state options.
    fetchCountries(getStateOptions, values).then(data => {
      // Set state on stateOptions.
      setStates(data);
    });
    if (!(values.Country === "US" || values.Country === "CA")) {
      setStatesDisabled(true);
    } else {
      setStatesDisabled(false);
    }
  }, [values.Country]);

  return (
    <>
      <h3>More about me</h3>
      <RfiSelect
        label="Country of citizenship"
        id="CitizenshipCountry"
        name="CitizenshipCountry"
        options={countryOptions}
      />
      {/*
      <RfiCheckboxSingle id="notCitizen" name="notCitizen" value="1">
        I am not a U.S. citizen and do not have a green card.
      </RfiCheckboxSingle> */}
      <RfiTextInput label="Address" id="Street1" name="Street1" />
      <RfiTextInput label="City" id="City" name="City" />
      <RfiSelect
        label="Country"
        id="Country"
        name="Country"
        options={countryOptions}
      />
      <RfiSelect
        label="State or Province"
        id="State"
        name="State"
        options={stateOptions}
        disabled={statesDisabled}
      />
      <RfiTextInput label="Zipcode" id="Zip" name="Zip" />
      <RfiDatepicker
        label="Date of Birth"
        id="BirthDate"
        name="BirthDate"
        dateFormat="MM/dd/yyyy"
        className="form-control"
        placeholderText="MM/DD/YYYY"
      />
      <RfiSelect
        label="U.S. Veteran admission information and services"
        id="MilitaryStatus"
        name="MilitaryStatus"
        options={veteranStatusOptions}
      />
      <RfiTextArea
        label="Additional assistance requested"
        id="Comments"
        name="Comments"
      />
    </>
  );
};

// Step configs

const optionalForm = {
  component: Optional,
  validationSchema: {
    CitizenshipCountry: Yup.string(),
    // notCitizen: Yup.string(),
    Street1: Yup.string(),
    City: Yup.string(),
    State: Yup.string(),
    Country: Yup.string(),
    BirthDate: Yup.date(),
    Zip: Yup.string(), // TODO default to * ZipCode *
    MilitaryStatus: Yup.string(),
    Comments: Yup.string().max(250, "Too long. 250 characters maximum."),
  },

  initialValues: {
    CitizenshipCountry: undefined,
    Street1: undefined,
    City: undefined,
    State: undefined,
    Country: undefined,
    Zip: undefined,
    BirthDate: undefined,
    MilitaryStatus: undefined,
    Comments: undefined,
  },
};

export { optionalForm };

/*
HIDDEN FIELDS
- Test - 1 or nothing
- Source
- URL
- ga_clientid
- datetime
*/
