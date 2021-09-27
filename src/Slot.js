import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import deviceData from './deviceData.json';

export default function Slot(props) {
  const [deviceId, setDeviceId] = useState(0); //  equals the id of the chosen device
  const [width, setWidth] = useState('100px');
  const [height, setHeight] = useState('100px');
  const [show, setShow] = useState('flex');
  const [rotate, setRotate] = useState(false);

  // when mounted

  useEffect(() => {
    if (props.sharedDevice) {
      setDeviceId(props.sharedDevice);
      if (props.sharedRotation === 'true') setRotate(true); // rotate if props.sharedRotation set to "true"
    } else if (props.slotId === 0) {
      setDeviceId(2); // set first slot to the device #2 as default
      props.handleChange(0);
    }
  }, [props]);

  // when mounted and when deviceId or rotate is updated

  useEffect(() => {
    props.changeSharedParams(props.slotId, deviceId, rotate);
    // deviceId is "collapse"
    if (deviceId === '1') {
      setShow('none');
    } else {
      // deviceId (id) is not "collapse"
      setWidth(deviceData.devices[deviceId].width + 'px');
      setHeight(deviceData.devices[deviceId].height + 'px');
    }
  }, [deviceId, rotate, props]);

  // ------ DISABLING STUFF

  // disable the Select field for the last slot

  const disableSelect =
    props.slotId === props.numberOfSlots - 1 ? 'true' : null; // null works, but 'false' would not!!

  // disable the rotate button for the last slot and when no selection has been made

  const disableRotate =
    props.slotId === props.numberOfSlots - 1 || deviceId === 0 ? 'true' : null;

  // disable then collapse button for the first slot, the last slot, and when no selection has been made

  const disableCollapse =
    props.slotId === 0 ||
    props.slotId === props.numberOfSlots - 1 ||
    deviceId === 0
      ? 'true'
      : null;

  // ---- STYLES

  const slotStyles = css`
    /* display 'none' when collapsed */
    display: ${show};
    flex-wrap: nowrap;
    flex-direction: column;
    margin-right: 30px;

    select {
      height: 35px;
      width: min-content;
      font-size: 100%;
    }
    .collapse-rotate-container {
      display: flex;
      flex-wrap: nowrap;
    }
    iframe {
      width: ${rotate ? height : width};
      /* 4 CASES: rotate + stretch --> 500px ///  rotate (no stretch) --> width //// stretch (no rotate) --> 500px /// (nothing) --> height */
      height: ${rotate
        ? props.stretchMode
          ? '500px'
          : width
        : props.stretchMode
        ? '500px'
        : height};
      background-color: white; /* good? */
      overflow: auto;
    }
  `;

  // --------

  function handleSelectChange(event) {
    setDeviceId(event.currentTarget.value);
  }

  function handleCollapseClick() {
    setDeviceId('1');
  }

  function handleRotateClick() {
    setRotate((previous) => !previous);
  }

  return (
    <div className="slotWrapper" css={slotStyles}>
      <div className="select">
        <select
          onChange={(event) => {
            handleSelectChange(event); // set the device
            props.handleChange(props.slotId); // if this is the penultimate slot, create a new slot
          }}
          value={deviceId}
          disabled={disableSelect}
        >
          {deviceData.devices.map((device, index) => {
            if (index === 0) {
              return (
                <option key={device.id} value={device.id} disabled>
                  {device.device}
                </option>
              );
            }
            return (
              <option key={device.id} value={device.id}>
                {device.device}
              </option>
            );
          })}
        </select>
      </div>
      <div className="collapse-rotate-container">
        <button onClick={() => handleRotateClick()} disabled={disableRotate}>
          Rotate
        </button>
        <button
          onClick={() => handleCollapseClick()}
          disabled={disableCollapse}
        >
          Collapse
        </button>
      </div>
      <div className="display">
        <iframe title={deviceData.devices[props.slotId].id} src={props.url} />
      </div>
    </div>
  );
}
