import React, { useEffect, useState } from 'react';
import { useMatches, useParams } from 'react-router-dom';
import { getTourney, updateTournament } from '../tournament.service';
import { useImageCache } from 'core/context/imageCacheContext/imageCacheContext.consumer';
import { type Contact, type Team } from 'graphql/table.models';
import { type TournamentFormatType, type Fields, type TournamentRules, type Tournaments } from 'API';
import { type TournamentFormType } from '../models/tournamentForm.model';
import { turnTourneyDBModelToTourneyForm } from '../shared/utils';
import DashboardLoading from 'core/layout/dashboardLoading';
import { type CustomUseMataches } from 'core/models/breadcrumbs.model';
import Button from 'core/components/button/button';
import { useTranslation } from 'react-i18next';
import { InfoCard } from 'core/layout/infoCard';
import Loader from 'assets/images/loader.gif';
import PlayOffs from './playoffs';
import { FormProvider, useForm } from 'react-hook-form';
import Standings from './standings';
import { ReactComponent as Toggle } from '../../../assets/svgs/toggle.svg';
import DropdownButton from 'core/components/button/dropdownButton';
import { ReactComponent as CheckMark } from '../../../assets/svgs/checkMark.svg';
import Rules from './rules';
import Spinner from 'features/shared/components/spinner';
import { toastService } from 'core/services/toast.service';

export default function ViewTourney (): JSX.Element {
  const { id } = useParams();
  const imageCache = useImageCache();
  const [isLoading, setIsloading] = useState<boolean>(true);
  const matches: CustomUseMataches[] = useMatches() as CustomUseMataches[];
  const { t: translate } = useTranslation(['tournament']);
  const [viewTourneyType, setViewTourneyType] = useState<'STANDINGS' | 'PLAYOFFS' | 'RULES'>('PLAYOFFS');
  const [imgUrl, setImageUrl] = useState(Loader);
  const [isSavingRules, setIsSavingRules] = useState(false);
  const [disableEndTourney, setDisableEndTourney] = useState(false);
  const [alltourneyInfo, setAllTourneyInfo] = useState<{
    teams: Team[] | undefined
    tournamentRules: TournamentRules[]
    referees: Contact[]
    tournaments: Tournaments[]
    fields: Fields[]
    tourney?: TournamentFormType
    tourneyData?: Tournaments
    allContacts?: Contact[]
  }>();

  const BreadCrumbs = (): JSX.Element => {
    if (matches[1].handle?.crumbs === undefined) {
      return <></>;
    }

    if (alltourneyInfo !== undefined) {
      return matches[1].handle?.crumbs(alltourneyInfo.tourneyData?.id, `${alltourneyInfo.tourney?.leagueName ?? ''}`);
    };

    return matches[1].handle?.crumbs();
  };

  const onEndTourney = async (): Promise<void> => {
    const _version = alltourneyInfo?.tourneyData?._version;
    setDisableEndTourney(true);
    try {
      await updateTournament({
        id,
        haveEnded: true,
        _version
      });
      toastService(`Tournament ${alltourneyInfo?.tourneyData?.tournamentName ?? ''} has ended!`, 'secondary');
    } catch (err) {
      console.log('Failed to end tournament', err);
      toastService('Failed to end tournament', 'error');
      setDisableEndTourney(false);
    }
  };

  const updateTourneyData = async (brandNewLoad?: boolean): Promise<TournamentFormType | undefined> => {
    return await getTourney(id ?? '').then(async (res) => {
      const tourney = res?.getTournaments;
      if (tourney?.TFGroups?.items.length === 0) {
        setIsloading(false);
        return;
      }
      const img: File | undefined = await imageCache.getImageFile(tourney?.tournamentImageId ?? '');
      const formTourney = turnTourneyDBModelToTourneyForm(tourney, img, res?.allContacts.items ?? []);
      void imageCache.getImageWithCache(tourney?.tournamentImageId ?? '').then((blobUrl) => {
        setImageUrl(blobUrl);
      }).catch(() => {
        setImageUrl('');
      });

      setAllTourneyInfo({
        tourney: formTourney ?? undefined,
        tourneyData: tourney,
        teams: res?.listTeams.items,
        referees: res?.listContacts.items ?? [],
        fields: res?.listFields.items ?? [],
        tournaments: res?.listTournaments.items ?? [],
        tournamentRules: res?.listTournamentRules.items ?? [],
        allContacts: res?.allContacts.items ?? []
      });

      setDisableEndTourney(!!tourney?.haveEnded);
      if (brandNewLoad === true) {
        setIsloading(false);
      }

      return formTourney;
    }).finally(() => {
      setIsloading(false);
    });
  };

  const checkMark = (): JSX.Element => {
    return (
      <span className="pt-2">
        <CheckMark className="w-6 h-6"/>
      </span>
    );
  };

  useEffect(() => {
    void updateTourneyData(true);
  }, []);

  const methods = useForm<TournamentFormType>({
    defaultValues: alltourneyInfo?.tourney,
    reValidateMode: 'onChange',
    mode: 'onChange',
    values: alltourneyInfo?.tourney
  });

  return (
    isLoading
      ? <DashboardLoading />
      : <FormProvider {...methods}>
          <div className='flex justify-between items-center w-full py-2 px-4 border-b border-grey-90'>
            <BreadCrumbs />
            {alltourneyInfo?.tourney?.type === 'ROUNDROBIN'
              ? (
                  <span className="gap-2 md:flex mobile:hidden sm:hidden z-1000">
                    <Button
                      type={viewTourneyType === 'STANDINGS' ? 'primary' : 'tertiary'}
                      text={translate('viewTourney.standingsBtn')}
                      className=""
                      cyData="addCaptainButton"
                      size="medium"
                      onClickCallable={() => {
                        setViewTourneyType('STANDINGS');
                      }}
                    />
                    <Button
                      type={viewTourneyType === 'PLAYOFFS' ? 'primary' : 'tertiary'}
                      text={translate('viewTourney.playoffBtn')}
                      className=""
                      cyData="addCaptainButton"
                      size="medium"
                      onClickCallable={() => {
                        setViewTourneyType('PLAYOFFS');
                      }}
                    />
                  </span>
                )
              : (
                  <></>
                )}
              <span className="gap-2 md:flex hidden z-1000">
                <Button
                  type={viewTourneyType === 'RULES' ? 'primary' : 'tertiary'}
                  text={translate('viewTourney.rulesBtn')}
                  className=""
                  cyData="tournamentRules"
                  size="medium"
                  onClickCallable={() => {
                    setViewTourneyType('RULES');
                  }}
                />
              </span>
            <div className="flex">
             {
              alltourneyInfo?.tourney?.type === 'ROUNDROBIN' && <DropdownButton className='md:hidden mobile:flex' labelClassName='border-transparent shadow-none' Icon={Toggle} buttonText='' cyData='tourneyToggle'>
                <span className='flex flex-col w-full'>
                  <label className={`px-4 py-3 flex justify-between items-center ${viewTourneyType === 'PLAYOFFS' ? 'text-secondary' : ''}`}
                  onClick={() => { setViewTourneyType('PLAYOFFS'); }}
                  >
                  {translate('viewTourney.playoffBtn')}
                  {viewTourneyType === 'PLAYOFFS' && checkMark()}
                  </label>
                  <label className={`px-4 py-3 flex justify-between items-center ${viewTourneyType === 'STANDINGS' ? 'text-secondary' : ''}`}
                  onClick={() => { setViewTourneyType('STANDINGS'); }}
                  >
                  {translate('viewTourney.standingsBtn')}
                  {viewTourneyType === 'STANDINGS' && checkMark()}
                  </label>
                  <label className={`px-4 py-3 flex justify-between items-center ${viewTourneyType === 'RULES' ? 'text-secondary' : ''}`}
                  onClick={() => { setViewTourneyType('RULES'); }}
                  >
                  {translate('viewTourney.rulesBtn')}
                  </label>
                </span>
              </DropdownButton>
             }
              { isSavingRules && <Spinner size="h-6 w-6 md:h-8 md:h-8" /> }
            </div>
          </div>

          { viewTourneyType === 'PLAYOFFS' && (<InfoCard
            image={imgUrl}
            id={id ?? ''}
            textHeader={alltourneyInfo?.tourneyData?.tournamentName ?? ''}
            bio={alltourneyInfo?.tourneyData?.tournamentDescription ?? ''}
            editButtonText= {translate('viewTourney.editTourneyHeader')}
            editButtonOnClickNavigate={'/tournament/edit/'}
            endTournamentButtonText={String(translate('viewTourney.endTournament'))}
            showAddButton={false}
            onEndTourney={onEndTourney}
            onEndTourneyDisabled= {disableEndTourney}
            otherProps={{
              totalTeams: (alltourneyInfo?.tourney?.numOfTeams ?? 16).toString(),
              SportsType: 'Soccer',
              totalFields: (alltourneyInfo?.tourney?.fieldsDetails?.length ?? 0).toString()
            }}
          otherPropsHeaders={{
            totalTeams: 'Total Teams',
            SportsType: 'Sports Type',
            totalFields: 'Total Fields'
          }}
          />)}
          { viewTourneyType === 'PLAYOFFS' && <PlayOffs updateTourneyData={updateTourneyData}
            tourneyForm={alltourneyInfo?.tourney} tourneyData={alltourneyInfo?.tourneyData}/> }
          { viewTourneyType === 'STANDINGS' && <Standings groups={alltourneyInfo?.tourney?.groups}
            type={alltourneyInfo?.tourney?.type as TournamentFormatType} rules={alltourneyInfo?.tourneyData} /> }
          { viewTourneyType === 'RULES' && <Rules onSavingChange={setIsSavingRules} rulesText={alltourneyInfo?.tourneyData?.customRules ?? undefined} tournament={alltourneyInfo?.tourneyData as any} /> }
      </FormProvider>
  );
}
