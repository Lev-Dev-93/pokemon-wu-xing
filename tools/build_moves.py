import zipfile,csv,io,json,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1]
ZIP=pathlib.Path('/mnt/data/01_Pokeapi_Full_Data.zip')
with zipfile.ZipFile(ZIP) as z:
 def read(n):return list(csv.DictReader(io.TextIOWrapper(z.open(f'data/v2/csv/{n}.csv'),encoding='utf-8-sig')))
 moves={int(x['id']):{'id':int(x['id']),'name':x['identifier'],'typeId':int(x['type_id']),'power':int(x['power']) if x['power'] else None,'pp':int(x['pp']) if x['pp'] else None,'accuracy':int(x['accuracy']) if x['accuracy'] else None,'category':int(x['damage_class_id']),'priority':int(x['priority'])} for x in read('moves') if int(x['generation_id'])<=5}
 for x in read('move_names'):
  if x['local_language_id']=='6' and int(x['move_id']) in moves:moves[int(x['move_id'])]['de']=x['name']
 learn={}
 for x in read('pokemon_moves'):
  p=int(x['pokemon_id']);m=int(x['move_id'])
  if 1<=p<=493 and x['version_group_id']=='11' and x['pokemon_move_method_id']=='1' and m in moves:
   learn.setdefault(p,[]).append([int(x['level']),m])
 for p in learn:learn[p]=sorted(set(tuple(x) for x in learn[p]))
 species={int(x['id']):x for x in read('pokemon_species') if 1<=int(x['id'])<=493}
 evo={}
 for x in read('pokemon_evolution'):
  target=int(x['evolved_species_id']);fromid=int(species[target]['evolves_from_species_id']) if target in species and species[target]['evolves_from_species_id'] else 0
  if fromid not in species:continue
  if x['version_group_id'] and int(x['version_group_id'])>11:continue
  e={'to':target,'trigger':int(x['evolution_trigger_id']),'level':int(x['minimum_level']) if x['minimum_level'] else None,'item':int(x['trigger_item_id']) if x['trigger_item_id'] else None,'conditions':{k:v for k,v in x.items() if k not in ['id','evolved_species_id','evolution_trigger_id','version_group_id','is_default','minimum_level','trigger_item_id'] and v and v!='0'}}
  if e not in evo.setdefault(fromid,[]):evo[fromid].append(e)
 efficacy=[[int(x['damage_type_id']),int(x['target_type_id']),int(x['damage_factor'])] for x in read('type_efficacy')]
 types={}
 for x in read('pokemon_types'):
  p=int(x['pokemon_id']);
  if 1<=p<=493:types.setdefault(p,[]).append((int(x['slot']),int(x['type_id'])))
 types={p:[t for _,t in sorted(ts)] for p,ts in types.items()}
 growth={int(p):int(s['growth_rate_id']) for p,s in species.items()}
 exp={}
 for x in read('experience'):
  if int(x['level'])<=100:exp.setdefault(int(x['growth_rate_id']),{})[int(x['level'])]=int(x['experience'])
 payload={'moves':moves,'learnsets':learn,'evolutions':evo,'typeChart':efficacy,'types':types,'growth':growth,'experience':exp}
 (ROOT/'src'/'battle-data.js').write_text('/* Generated from user-provided PokeAPI CSV v2; Black/White version group 11. */\nexport const BATTLE_DATA='+json.dumps(payload,ensure_ascii=False,separators=(',',':'))+';\n')
 print('moves',len(moves),'learnsets',len(learn),'evolution sources',len(evo),'bytes', (ROOT/'src'/'battle-data.js').stat().st_size)
