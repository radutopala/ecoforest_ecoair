import string, logging
from dataclasses import dataclass

import httpx
from pyecoforest.api import EcoforestApi

from custom_components.ecoforest_ecoair.overrides.device import EcoAirDevice

_LOGGER = logging.getLogger(__name__)

OP_TYPE_SET_SWITCH = 2011
OP_TYPE_SET_REGISTER = 2012

SET_MAPPING = {
    "switch_dhw_recirculation": {
        "operation": OP_TYPE_SET_SWITCH,
        "address": 1535,
    },
    "switch_dhw": {
        "operation": OP_TYPE_SET_SWITCH,
        "address": 1524,
    },
    "number_dhw_setpoint": {
        "operation": OP_TYPE_SET_REGISTER,
        "address": 6106,
    },
    "number_dhw_recirculation": {
        "operation": OP_TYPE_SET_REGISTER,
        "address": 6112,
    },
}

GET_MAPPING = {
    2103: [
        {
            "name": "number_dhw_setpoint",
            "address": 4,
            "type": "float",
            "entity_type": "temperature",
            "is_number": True,
            "min": 0,
            "max": 65,
            "step": 0.1,
        },
        {
            "name": "number_dhw_recirculation",
            "address": 10,
            "type": "float",
            "entity_type": "temperature",
            "is_number": True,
            "min": 0,
            "max": 40,
            "step": 0.1,
        },
    ],
    2104: [
        {
            "name": "switch_dhw_recirculation",
            "address": 14,
            "type": "boolean",
            "entity_type": "switch",
        },
        {
            "name": "switch_dhw",
            "address": 3,
            "type": "boolean",
            "entity_type": "switch",
        },
    ],
    2125: [
        {
            "name": "model_name",
            "value_fn": lambda self, response: self.concatenate_model_name(
                response[:5]
            ),
        },
    ],
    2148: [
        {
            "name": "t_outdoor",
            "type": "float",
            "entity_type": "temperature",
            "address": 21,
        },
        {
            "name": "t_brine_in",
            "type": "float",
            "address": 19,
            "entity_type": "temperature",
        },
        {
            "name": "t_brine_out",
            "type": "float",
            "address": 22,
            "entity_type": "temperature",
        },
        {
            "name": "p_brine",
            "type": "float",
            "address": 18,
            "entity_type": "pressure",
        },
        {
            "name": "ventilation_rate",
            "type": "float",
            "address": 30,
            "entity_type": "measurement",
        },
        {
            "name": "state",
            "type": "int",
            "entity_type": "state",
            "address": 6,
        },
    ],
    2149: [
        {
            "name": "cop",
            "entity_type": "measurement",
            "value_fn": lambda self, response: (
                0
                if len(response) <= 3
                else (
                    val1 := self.parse_ecoforest_int(response[1]),
                    val2 := self.parse_ecoforest_int(response[3]),
                    (
                        round(float(val1) / float(val2), 1)
                        if val1 != 0 and val2 != 0
                        else 0
                    ),
                )[-1]
            ),
        },
        {
            "name": "power_electric",
            "type": "float",
            "entity_type": "power",
            "address": 3,
        },
        {
            "name": "power_heating",
            "type": "float",
            "entity_type": "power",
            "address": 1,
        },
    ],
    2150: [
        {
            "name": "boiler_state",
            "type": "int",
            "entity_type": "state",
            "address": 0,
        },
    ],
    2151: [
        {
            "name": "t_dhw",
            "type": "float",
            "entity_type": "temperature",
            "address": 28,
        },
    ],
}

""" MAPPING = {
    "t_heating": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 200,
        "entity_type": "temperature",
    },
    "t_dg1_h": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 3,
        "entity_type": "temperature",
    },
    "t_dg1_c": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 197,
        "entity_type": "temperature",
    },
    "t_sg2": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 194,
        "entity_type": "temperature",
    },
    "t_sg3": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 195,
        "entity_type": "temperature",
    },
    "t_sg4": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 196,
        "entity_type": "temperature",
    },
    "p_output": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 14,
        "entity_type": "pressure",
    },
    "switch_heating": {
        "data_type": DataTypes.Coil,
        "type": "boolean",
        "address": 121,
        "entity_type": "switch",
    },
    "switch_dg1_output": {
        "data_type": DataTypes.Coil,
        "type": "boolean",
        "address": 60,
        "entity_type": "switch",
    },
    "switch_sg2_output": {
        "data_type": DataTypes.Coil,
        "type": "boolean",
        "address": 57,
        "entity_type": "switch",
    },
    "button_reset_alarms": {
        "data_type": DataTypes.Coil,
        "type": "boolean",
        "address": 130,
        "entity_type": "button",
    },
    "number_dhw_setpoint": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 40,
        "entity_type": "temperature",
        "is_number": True,
        "min": 0,
        "max": 65,
        "step": 0.1,
    },
    "number_dhw_recirculation": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 42,
        "entity_type": "temperature",
        "is_number": True,
        "min": 0,
        "max": 60,
        "step": 0.1,
    },
    "number_dhw_dt_start": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 41,
        "entity_type": "temperature",
        "is_number": True,
        "min": 2,
        "max": 25,
        "step": 0.1,
    },
    "number_dhw_htr_set": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 59,
        "entity_type": "temperature",
        "is_number": True,
        "min": 0,
        "max": 70,
        "step": 0.1,
    },
}
"""


class EcoAirApi(EcoforestApi):
    def __init__(self, host: str, user: str, password: str) -> None:
        super().__init__(host, httpx.BasicAuth(user, password))

    async def get(self) -> EcoAirDevice:
        state = {}

        for operation, definitions in GET_MAPPING.items():
            state[operation] = await self._load_data(operation)

        device_info = {}

        # Process each operation mapping
        for operation, definitions in GET_MAPPING.items():
            # Process each definition in the operation
            for definition in definitions:
                value = None
                if "value_fn" in definition:
                    # Apply the value function to get the result
                    value = definition["value_fn"](self, state[operation])
                    _LOGGER.debug(
                        "value_fn received value: %s (type: %s)", value, type(value)
                    )
                elif "address" in definition:
                    # Get the raw value
                    value = state[operation][definition["address"]]

                    match definition["type"]:
                        case "int":
                            value = self.parse_ecoforest_int(value)
                        case "float":
                            value = self.parse_ecoforest_float(value)
                        case "boolean":
                            value = self.parse_ecoforest_bool(value)
                        case _:
                            _LOGGER.warning(
                                "unknown definition type for %s", definition["name"]
                            )
                            continue

                device_info[definition["name"]] = value

        for operation, definitions in GET_MAPPING.items():
            # Process each definition in the operation
            for definition in definitions:
                if "entity_type" not in definition:
                    continue

                if definition["entity_type"] == "temperature":
                    if device_info[definition["name"]] == -999.9:
                        device_info[definition["name"]] = None

                # Convert power to W
                if (
                    definition["entity_type"] == "power"
                    and definition["name"] in device_info
                ):
                    device_info[definition["name"]] = (
                        device_info[definition["name"]] * 10
                    )

                if definition["entity_type"] == "state":
                    device_info[definition["name"]] = {
                        0: "off",
                        1: "on",
                        2: "emergency",
                        3: "off",
                    }.get(device_info[definition["name"]], "unknown")

        _LOGGER.debug(device_info)
        _LOGGER.debug(state)
        return EcoAirDevice.build(device_info["model_name"], device_info)

    async def _load_data(self, operation) -> dict:
        response = await self._request(data={"idOperacion": operation})

        return response

    async def turn_switch(self, name, on: bool | None = False) -> EcoAirDevice:
        if name not in SET_MAPPING.keys():
            raise Exception("unknown switch")

        await self._request(
            data={
                "idOperacion": SET_MAPPING[name]["operation"],
                "dir": SET_MAPPING[name]["address"],
                "num": 1,
                int(on): int(on),
            }
        )
        return await self.get()

    async def set_numeric_value(self, name, value: float) -> EcoAirDevice:
        if name not in SET_MAPPING.keys():
            raise Exception("unknown register")

        converted_value = self.convert_to_ecoforest_int(value)

        await self._request(
            data={
                "idOperacion": SET_MAPPING[name]["operation"],
                "dir": SET_MAPPING[name]["address"],
                "num": 1,
                converted_value: converted_value,
            }
        )
        return await self.get()

    def _parse(self, response: str) -> list[str]:
        lines = [line.strip() for line in response.split("\n") if line.strip()]

        if not lines:
            raise Exception("empty response")

        # Parse error line
        error_line = lines[0]
        error_code = error_line.split("=")
        if len(error_code) != 2 or error_code[1] != "0":
            raise Exception(f"bad response: {response}")

        # For lines containing =, take the part after =, otherwise keep the original value
        return [line.split("=")[1] if "=" in line else line for line in lines[1:-1]]

    def convert_to_ecoforest_int(self, value):
        value = int(value * 10)

        if value < 0:
            value += 65536

        return ("0000" + hex(value)[2:])[-4:]

    def parse_ecoforest_int(self, value):
        _LOGGER.debug(
            "parse_ecoforest_int received value: %s (type: %s)", value, type(value)
        )
        result = int(value, 16)
        return result if result <= 32768 else result - 65536

    def parse_ecoforest_bool(self, value):
        _LOGGER.debug(
            "parse_ecoforest_boolean received value: %s (type: %s)", value, type(value)
        )
        return bool(int(value))

    def parse_ecoforest_float(self, value):
        return self.parse_ecoforest_int(value) / 10

    def _parse_model_hex_to_char(self, value: str) -> str:
        """Convert hex value to model name character using the same mapping as JavaScript."""
        _LOGGER.debug(
            "_parse_model_hex_to_char received value: %s (type: %s)", value, type(value)
        )
        val = int(value, 16)
        if val > 32768:
            val = val - 65536

        # Return -- for 0, digits for 1-10, letters for 11-36
        if val == 0:
            return "--"
        elif 1 <= val <= 10:
            return str(val - 1)  # 1->0, 2->1, etc
        elif 11 <= val <= 36:
            return chr(val - 11 + ord("A"))  # 11->A, 12->B, etc
        return "--"

    def concatenate_model_name(self, parts: list[str]) -> str:
        """Concatenate hex values into model name using same logic as JavaScript."""
        if len(parts) < 5:
            return ""

        # Convert each hex value to its character representation
        chars = [self._parse_model_hex_to_char(part) for part in parts]
        return "".join(chars)
