"""Switch platform for Ecoforest."""

from __future__ import annotations

from collections.abc import Awaitable, Callable
from dataclasses import dataclass

from homeassistant.const import CONF_ALIAS
from pyecoforest.api import EcoforestApi
from pyecoforest.models.device import Device

from homeassistant.components.switch import SwitchEntity, SwitchEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN
from .coordinator import EcoforestCoordinator
from .entity import EcoforestEntity
from .overrides.api import GET_MAPPING


@dataclass(frozen=True, kw_only=True)
class EcoforestSwitchEntityDescription(SwitchEntityDescription):
    """Describes an Ecoforest switch entity."""

    value_fn: Callable[[Device], bool]
    switch_fn: Callable[[EcoforestApi, bool], Awaitable[Device]]


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Ecoforest switch platform."""
    coordinator: EcoforestCoordinator = hass.data[DOMAIN][config_entry.entry_id]

    device_alias = (
        config_entry.data[CONF_ALIAS] if CONF_ALIAS in config_entry.data else None
    )
    entities = [
        EcoforestSwitchEntity(coordinator, definition["name"], definition, device_alias)
        for _, definitions in GET_MAPPING.items()
        for definition in definitions
        if "entity_type" in definition and definition["entity_type"] == "switch"
    ]

    async_add_entities(entities)


class EcoforestSwitchEntity(EcoforestEntity, SwitchEntity):
    """Representation of an Ecoforest switch entity."""

    entity_description: EcoforestSwitchEntityDescription

    @property
    def is_on(self) -> bool:
        """Return the state of the ecoforest device."""
        return self.data.state[self.entity_description.key]

    async def async_turn_on(self):
        """Turn on the ecoforest device."""
        await self.coordinator.api.turn_switch(self.entity_description.key, True)
        await self.coordinator.async_request_refresh()

    async def async_turn_off(self):
        """Turn off the ecoforest device."""
        await self.coordinator.api.turn_switch(self.entity_description.key, False)
        await self.coordinator.async_request_refresh()
