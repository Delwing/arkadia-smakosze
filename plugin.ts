/**
 * Podpowiedzi emotek Klubu Smakoszy - Tab completion for the Klub Smakoszy
 * emotes (the `sm*` commands).
 *
 * Every emote goes into the command line's Tab completion. The client completes
 * the last word being typed, and a suggestion may hold spaces, so emotes with a
 * fixed argument ("smobliz sie", "smbeknij donosnie") are offered whole. Emotes
 * whose argument is a free target are offered bare.
 *
 * See README.md for build / host / publish details.
 */

import type { PluginApi, PluginInfo } from '@arkadia/plugin-types';

const PLUGIN_NAME = 'Podpowiedzi emotek Klubu Smakoszy';
const PLUGIN_VERSION = '1.0.0';
const PLUGIN_AUTHOR = 'Dargoth';
const PLUGIN_DESCRIPTION = 'Podpowiedzi (Tab) dla emotek Klubu Smakoszy.';

const SUGGESTIONS = [
  'smstukaj', // stukasz sztuccem o stol (tylko w karczmie)
  'smbeknij', // bekasz <ukradkiem/donosnie>
  'smbeknij ukradkiem',
  'smbeknij donosnie',
  'smobliz sie', // oblizujesz sie zachwalajac jadlo
  'smwytrzyj rekawem', // wycierasz usta
  'smwytrzyj dlonia',
  'smmlasnij', // mlaskasz glosno
  'smpowitaj', // [kogo] - witasz kogos pytajac o droge do karczmy
  'smpopedz', // popedzasz leniwa obsluge (tylko w karczmie)
  'smczytaj menu', // czytasz menu karczmy
  'smzapamietaj', // zapamietaj smak potrawy (tylko w karczmie)
  'smwspomnij', // wspomnij smak potrawy
  'smgroz', // smgroz[ba] [komu] - grozisz swa lyzeczka
  'smpuknij', // <kogo> - pukasz kogos lyzka w glowe
  'smgesty', // smgesty[kuluj] - gestykulujesz widelcem
  'smdzgnij', // <kogo> - zlosliwie dzgasz kogos
];

let pluginApi: PluginApi | null = null;

export async function init(api: PluginApi): Promise<PluginInfo> {
  pluginApi = api;
  api.command.addSuggestions(...SUGGESTIONS);

  return {
    name: PLUGIN_NAME,
    version: PLUGIN_VERSION,
    author: PLUGIN_AUTHOR,
    description: PLUGIN_DESCRIPTION,
  };
}

export async function destroy(): Promise<void> {
  // The host calls destroy() with no arguments, so use the api captured at init.
  // It also drops the suggestions on unload; removing them here keeps a reload clean.
  pluginApi?.command.removeSuggestions(...SUGGESTIONS);
  pluginApi = null;
}
