from dataclasses import dataclass


@dataclass
class EcoAirDevice:
    is_supported: bool
    model_name: str

    state: dict[str, any] | None = None

    @classmethod
    def build(cls, model_name: str, data: dict[str, any]):  # -> EcoAirDevice:

        return EcoAirDevice(
            is_supported=True,
            model_name=model_name,
            state=data
        )
