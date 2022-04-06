import { config } from './config';
import { imagePathCurrent, imagePathDifference } from './constants';
import { collectStories, generateShotItems } from './crawler/storybook';
import { takeScreenShots } from './shots/shots';
import { log, removeFilesInFolder } from './utils';

export const createShots = async () => {
  const collection = await collectStories(config.storybookUrl);

  removeFilesInFolder(imagePathCurrent);
  removeFilesInFolder(imagePathDifference);

  if (!collection.stories) {
    log('Error: Stories not found');
    process.exit(1);
  }

  log(`Found ${collection.stories.length} stories`);

  const shotItems = generateShotItems(config.storybookUrl, collection.stories);
  log(`Prepared ${shotItems.length} stories for screenshots`);

  await takeScreenShots(shotItems);

  log('Screenshots done!');

  return shotItems;
};
