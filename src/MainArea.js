/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import deviceData from './deviceData.json';
import { mainAreaStyles } from './mainAreaStyles.js';
import Slot from './Slot.js';

// *********************************

// setting up variables for the destructuring of the URL

let sharedDevices = [];
let sharedRotations = [];
let sharedStretch = false;

const querystring = window.location.search; // everything from the "?"
if (querystring) {
  const params = new URLSearchParams(querystring); // creates a new searchable object
  sharedDevices = params.getAll('id'); // returns all the instances of 'id' in an array
  sharedRotations = params.getAll('rot'); // returns all the 'true' and 'false' values of rotations in an array
  sharedStretch = params.get('stretch'); // updates the value of sharedStretch to what is set inside the url params ('true' or 'false')
  if (sharedStretch === 'true') {
    // transform back into boolean
    sharedStretch = true;
  } else {
    sharedStretch = false;
  }
}

// setting up variables for the construction of the share-url

const sharedParams = new URLSearchParams({});
let sharedParamsString = '';
let simplifiedSharedParamsString = '';

// *********************************

export default function MainArea() {
  const [numberOfSlots, setNumberOfSlots] = useState(
    sharedDevices.length ? sharedDevices.length + 2 : 3,
  ); // show 2 more slots in the begging than shared devices; show 3 if there weren't any shared
  const [urlInput, setUrlInput] = useState('https://upleveled.io/'); // what was put in (not yet set)
  const [url, setUrl] = useState('https://upleveled.io/'); // the set Url
  const [stretchMode, setStretchMode] = useState(sharedStretch); // whether "stretch" mode is on (will be false if no querystring)
  const [shareUrl, setShareUrl] = useState(''); // the URL for sharing

  // on every render, create an array of "x"s having the same length as numberOfSlots
  const numberOfSlotsArray = Array(numberOfSlots).fill('x');

  function handleUrlChange(event) {
    setUrlInput(event.currentTarget.value);
  }

  function handleUrlClick() {
    setUrl(urlInput);
  }

  // when penultimate slot is selected, create a new slot
  // (this is also true for the "collapse"-option (id1). The slot collapses but creates a new empty one --> it seems as if nothing had happened)

  function handleChange(idOfClicked) {
    if (idOfClicked + 2 === numberOfSlots) {
      setNumberOfSlots((previous) => previous + 1); // add to numberOfSlots
    }
  }

  // when clicking 'share', generate the link for sharing

  function handleShareClick() {
    setShareUrl(window.location.origin + '/?' + simplifiedSharedParamsString);
  }

  // set stretchMode when pressing the button
  function handleStretchDefaultClick() {
    setStretchMode((previous) => !previous);
  }

  // ********** UPDATE THE SHARED PARAMS

  function changeSharedParams(slot, device, rotation) {
    if (device === '1') {
      // if collapse
      sharedParams.delete(`id${slot}`); // delete both entries for the given slot
      sharedParams.delete(`rot${slot}`);
    } else {
      sharedParams.set(`id${slot}`, device); // set slot to corresponding device
      sharedParams.set(`rot${slot}`, rotation); // set slot to corresponding rotation
    }
    sharedParamsString = sharedParams.toString(); // stringify
    // generate a simpler string (without slot and rot ids) and  without the two last device entries (where device is 0). (the two last rotations (false) will stay in the URL)
    simplifiedSharedParamsString = sharedParamsString
      .replace(/id\d+/g, 'id')
      .replace(/&id=0/g, '')
      .replace(/rot\d+/g, 'rot');
  }

  // when stretchMode is updated, set it in sharedParams

  useEffect(() => {
    sharedParams.set('stretch', stretchMode);
    sharedParamsString = sharedParams.toString();
    simplifiedSharedParamsString = sharedParamsString
      .replace(/id\d+/g, 'id')
      .replace(/&id=0/g, '')
      .replace(/rot\d+/g, 'rot');
  }, [stretchMode]);

  // ***************************

  return (
    <div className="main-area-container" css={mainAreaStyles}>
      <div className="control-div">
        <input
          id="url"
          placeholder="Enter a Url"
          onChange={(event) => handleUrlChange(event)}
          value={urlInput}
        />
        <button onClick={() => handleUrlClick()} className="big-button">
          Set Url
        </button>
        <div className="stretch-button-container">
          <h2>Set Screen Heights to: </h2>
          <button
            onClick={() => handleStretchDefaultClick()}
            className="big-button"
          >
            {stretchMode ? 'Default' : 'Stretch'}
          </button>
        </div>
      </div>
      <div className="share-div">
        <input
          id="shared-url"
          placeholder="Generate a link to share this view with others     -->"
          value={shareUrl}
          readOnly
        />
        <button onClick={() => handleShareClick()} className="big-button">
          Share
        </button>
      </div>
      <div className="slots">
        {/* generates as many Slots as number of elements in numberOfSlotsArray */}

        {numberOfSlotsArray.map((value, index) => (
          <Slot
            key={deviceData.devices[index].id} // use the ids from the json device date as keys
            slotId={deviceData.devices[index].id} // cannot use "props.key" for some reason
            numberOfSlots={numberOfSlots}
            handleChange={handleChange}
            url={url}
            stretchMode={stretchMode}
            sharedDevice={sharedDevices.length ? sharedDevices[index] : 0} // if there was a querystring, give the corresponding device;  if not, 0
            sharedRotation={
              sharedRotations.length ? sharedRotations[index] : 'false'
            } // if there was a querystring, give the corresponding rotation-value; if not, "false"
            changeSharedParams={changeSharedParams}
          />
        ))}
      </div>
    </div>
  );
}
