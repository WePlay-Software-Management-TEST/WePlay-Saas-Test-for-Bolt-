import React, { useEffect, useMemo, useState } from 'react';
import { ReactComponent as Note } from '../../../assets/svgs/note.svg';
import TextArea from 'core/components/input/textArea';
import { useFormContext } from 'react-hook-form';
import { type Tournaments } from 'API';
import { debounce } from 'lodash';
import { updateTournament } from '../tournament.service';

interface RulesProps {
  tournament: Tournaments | null | undefined
  rulesText?: string
  onSavingChange?: (saving: boolean) => void
};

const Rules: React.FC<RulesProps> = ({ tournament, rulesText, onSavingChange }: RulesProps) => {
  const { control, register, formState, getFieldState, watch, setValue } = useFormContext<{ customRules: string }>();
  const customRules = watch('customRules') ?? rulesText;
  const tourneyId = tournament?.id;
  const [_version, setVersion] = useState(tournament?._version ?? 1);

  useEffect(() => {
    if (tournament) {
      setValue('customRules', tournament.customRules ?? rulesText ?? '');
      setVersion(tournament?._version);
    }
  }, [tournament, setValue, rulesText]);

  const onSaveCustomRules = useMemo(
    () =>
      debounce(async (value: string, _version: number) => {
        if (!tourneyId) return;
        onSavingChange?.(true);

        try {
          const { data } = await updateTournament({
            id: tourneyId,
            customRules: value,
            _version
          });

          const newVersion = data?.updateTournaments?._version;
          setVersion(newVersion);
        } finally {
          onSavingChange?.(false);
        }
      }, 1000),
    [tourneyId]
  );

  const customRulesAreaProps = {
    legendText: ' ',
    placeholder: 'Write Tournament Rules...',
    cyData: 'customRules',
    id: 'customRules',
    registrationOption: register('customRules',
      {
        required: true,
        onChange: (e) => {
          void onSaveCustomRules(e.target.value, _version);
        }
      }
    ),
    fieldState: getFieldState('customRules', formState),
    formControl: control,
    className: 'w-full text-base placeholder:text-base placeholder:text-grey-50'
  };

  return (
<div className="relative w-full">
      <TextArea
        fieldSetFullHeight
        hideBorders
        onChange={onSaveCustomRules}
        {...customRulesAreaProps}
        className='h-96'
      />
      {!customRules && (
        <Note
          className="
            block
            absolute
            left-4
            top-0
            w-6 h-6
            text-grey-60
            pointer-events-none
          "
        />
      )}
    </div>
  );
};

export default Rules;
