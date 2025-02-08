import asyncio
import os
import logging
from custom_components.ecoforest_ecoair.overrides.api import EcoAirApi

# Configure logging
logging.basicConfig(
    level=logging.DEBUG, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)


async def test_api():
    # Create logger for this module
    logger = logging.getLogger(__name__)
    logger.debug("Starting API test")

    # Get credentials from environment variables
    host = os.environ["ECOFOREST_HOST"]
    user = os.environ["ECOFOREST_USER"]
    password = os.environ["ECOFOREST_PASSWORD"]

    # Create API instance with your device's details
    api = EcoAirApi(
        host=host,
        user=user,
        password=password,
    )

    try:
        # Get device info
        device_info = await api.get()
        print("Device Info:", device_info.state)

    except Exception as e:
        print(f"Error: {e}")
    finally:
        await api._client.aclose()  # Ensure we close the client


# Run the test
asyncio.run(test_api())
