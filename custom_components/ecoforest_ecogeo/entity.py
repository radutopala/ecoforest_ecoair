"""Base Entity for Ecoforest."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass

from homeassistant.components.sensor import SensorDeviceClass, SensorEntityDescription
from homeassistant.const import UnitOfTemperature, UnitOfPower, UnitOfPressure
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity import EntityDescription, generate_entity_id
from homeassistant.helpers.update_coordinator import CoordinatorEntity
from homeassistant.helpers.typing import StateType

from .const import DOMAIN, MANUFACTURER
from .coordinator import EcoforestCoordinator
from .overrides.device import EcoGeoDevice


SENSOR_TYPES = {
    "temperature": {"class": SensorDeviceClass.TEMPERATURE, "unit": UnitOfTemperature.CELSIUS},
    "pressure": {"class": SensorDeviceClass.PRESSURE, "unit": UnitOfPressure.BAR},
    "power": {"class": SensorDeviceClass.POWER, "unit": UnitOfPower.WATT}
}


@dataclass(frozen=True, kw_only=True)
class EcoforestSensorEntityDescription(SensorEntityDescription):
    """Describes Ecoforest sensor entity."""

    value_fn: Callable[[EcoGeoDevice], StateType] | None = None

class EcoforestEntity(CoordinatorEntity[EcoforestCoordinator]):
    """Common Ecoforest entity using CoordinatorEntity."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: EcoforestCoordinator,
        key: str,
        definition: dict[str, str],
        device_alias: str
    ) -> None:
        """Initialize device information."""

        if definition["entity_type"] in SENSOR_TYPES.keys():
            self.entity_description = EcoforestSensorEntityDescription(
                key=key,
                translation_key=key,
                native_unit_of_measurement = SENSOR_TYPES[definition["entity_type"]]["unit"],
                device_class = SENSOR_TYPES[definition["entity_type"]]["class"]
            )
        else:
            self.entity_description = EcoforestSensorEntityDescription(
                key=key,
                translation_key=key
            )

        device_id = coordinator.data.model_name if device_alias is None else device_alias
        id = f"{device_id}_{key}"
        self._attr_unique_id = id
        self.entity_id = f"sensor.{id}"

        super().__init__(coordinator)


        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, device_id)},
            name=MANUFACTURER,
            model=coordinator.data.model_name,
            manufacturer=MANUFACTURER,
        )

    @property
    def data(self) -> EcoGeoDevice:
        """Return ecoforest data."""
        assert self.coordinator.data
        return self.coordinator.data
