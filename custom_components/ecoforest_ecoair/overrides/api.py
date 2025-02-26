import string, logging
from dataclasses import dataclass

import httpx
from pyecoforest.api import EcoforestApi

from custom_components.ecoforest_ecoair.overrides.device import EcoAirDevice

_LOGGER = logging.getLogger(__name__)

OP_TYPE_SET_SWITCH = 2011
OP_TYPE_SET_REGISTER = 2012


class DataTypes:
    Register = 1
    Coil = 2


class Operations:
    Get = {DataTypes.Coil: 2001, DataTypes.Register: 2002}
    Set = {DataTypes.Coil: 2011, DataTypes.Register: 2012}


OPERATION_MAPPING = {
    2148: [
        {
            "name": "t_outdoor",
            "type": "float",
            "entity_type": "temperature",
            "address": 21,
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
    ],
    2151: [
        {
            "name": "t_dhw",
            "type": "float",
            "entity_type": "temperature",
            "address": 28,
        },
    ],
    2125: [
        {
            "name": "model_name",
            "type": "string",
            "entity_type": "sensor",
            "value_fn": lambda self, response: self.concatenate_model_name(
                response[:5]
            ),
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
    "t_cooling": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 201,
        "entity_type": "temperature",
    },
    "t_dhw": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 11,
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
    "t_outdoor": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 20,
        "entity_type": "temperature",
    },
    "power_heating": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 133,
        "entity_type": "power",
    },
    "power_cooling": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 134,
        "entity_type": "power",
    },
    "power_electric": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 135,
        "entity_type": "power",
    },
    "power_output": {
        "data_type": DataTypes.Register,
        "type": "custom",
        "entity_type": "power",
        "value_fn": lambda data: data["power_cooling"] + data["power_heating"],
    },
    "t_brine_in": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 2,
        "entity_type": "temperature",
    },
    "t_brine_out": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 1,
        "entity_type": "temperature",
    },
    "p_brine": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 13,
        "entity_type": "pressure",
    },
    "p_output": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 14,
        "entity_type": "pressure",
    },
    "cop": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 136,
        "entity_type": "measurement",
    },
    "pf": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 138,
        "entity_type": "measurement",
    },
    "switch_heating": {
        "data_type": DataTypes.Coil,
        "type": "boolean",
        "address": 121,
        "entity_type": "switch",
    },
    "switch_cooling": {
        "data_type": DataTypes.Coil,
        "type": "boolean",
        "address": 107,
        "entity_type": "switch",
    },
    "switch_dhw": {
        "data_type": DataTypes.Coil,
        "type": "boolean",
        "address": 213,
        "entity_type": "switch",
    },
    "switch_dhw_recirculation": {
        "data_type": DataTypes.Coil,
        "type": "boolean",
        "address": 123,
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
    "number_room_terminal_dg1_set_temperature": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 176,
        "entity_type": "temperature",
        "is_number": True,
        "min": 15,
        "max": 30,
        "step": 0.1,
    },
    "ventilation_rate": {
        "data_type": DataTypes.Register,
        "type": "float",
        "address": 30,
        "entity_type": "measurement",
    },
    "state": {
        "data_type": DataTypes.Register,
        "type": "int",
        "address": 5080,
        "entity_type": "state",
    },
    "boiler_state": {
        "data_type": DataTypes.Coil,
        "type": "int",
        "address": 29,
        "entity_type": "state",
    },
}
"""


class EcoAirApi(EcoforestApi):
    def __init__(self, host: str, user: str, password: str) -> None:
        super().__init__(host, httpx.BasicAuth(user, password))

    async def get(self) -> EcoAirDevice:
        state = {}

        for operation, definitions in OPERATION_MAPPING.items():
            state[operation] = await self._load_data(operation)

        device_info = {}

        # Process each operation mapping
        for operation, definitions in OPERATION_MAPPING.items():
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

        for operation, definitions in OPERATION_MAPPING.items():
            # Process each definition in the operation
            for definition in definitions:
                if definition["entity_type"] == "temperature":
                    if device_info[definition["name"]] == -999.9:
                        device_info[definition["name"]] = None

                # Convert power to W
                if (
                    definition["entity_type"] == "power"
                    and definition["name"] in device_info
                ):
                    device_info[definition["name"]] = (
                        device_info[definition["name"]] * 1000
                    )

                if definition["entity_type"] == "state":
                    device_info[definition["name"]] = {
                        0: "off",
                        1: "on",
                        2: "emergency",
                    }.get(device_info[definition["name"]], "unknown")

        _LOGGER.debug(device_info)
        _LOGGER.debug(state)
        return EcoAirDevice.build(device_info["model_name"], device_info)

    async def _load_data(self, operation) -> dict:
        response = await self._request(data={"idOperacion": operation})

        return response

    async def turn_switch(self, name, on: bool | None = False) -> EcoAirDevice:
        if name not in MAPPING.keys():
            raise Exception("unknown switch")

        await self._request(
            data={
                "idOperacion": OP_TYPE_SET_SWITCH,
                "dir": MAPPING[name]["address"],
                "num": 1,
                int(on): int(on),
            }
        )
        return await self.get()

    async def set_numeric_value(self, name, value: float) -> EcoAirDevice:
        if name not in MAPPING.keys():
            raise Exception("unknown register")

        converted_value = self.convert_to_ecoforest_int(value)

        await self._request(
            data={
                "idOperacion": OP_TYPE_SET_REGISTER,
                "dir": MAPPING[name]["address"],
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
