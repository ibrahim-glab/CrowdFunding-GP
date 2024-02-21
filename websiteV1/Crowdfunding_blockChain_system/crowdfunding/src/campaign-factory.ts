import { CampaignCreated as CampaignCreatedEvent } from "../generated/CampaignFactory/CampaignFactory"
import { CampaignCreated } from "../generated/schema"

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Owner = event.params.Owner
  entity.campaign = event.params.campaign

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
